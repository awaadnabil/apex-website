-- Public share pages: /dealer/{id}, /club/{id} and their /ar twins on getapexmena.com.
--
-- The website holds only the publishable (anon) key. These two RPCs are the ONLY thing it calls, and each
-- returns the public fields of one row and nothing else: no fee rates, no owners, no claim codes, no
-- invite codes, no phone numbers beyond the WhatsApp number a partner publishes on purpose.
--
--   select * from public.get_public_partner('536bb5e5-a041-45d6-9bb2-e977cc9bc325');
--   select * from public.get_public_club('d1becdcb-426f-43f1-bd10-002fc0b8ec89');
--
-- Run by the owner in the Supabase SQL Editor (PRODUCT.md). Idempotent: safe to run twice.
BEGIN;

-- 1. Partner (dealer or Ride Stop) ------------------------------------------------------------------
--   Active partners only (status = 'active'): a suspended partner's link shows the site's 404.
--   instagram_url wins over the bare handle; website_url over the older website column.
--   address is here only because it is what the Directions link needs when latitude/longitude are null
--   (some partners store a maps.app.goo.gl link there).
CREATE OR REPLACE FUNCTION public.get_public_partner(p_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  partner_type text,
  ride_stop_subtype text,
  city text,
  verified boolean,
  logo_url text,
  cover_url text,
  description text,
  community_perk text,
  member_perk text,
  instagram_url text,
  whatsapp text,
  website_url text,
  address text,
  latitude double precision,
  longitude double precision,
  google_place_id text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT d.id,
         d.name,
         d.partner_type,
         d.ride_stop_subtype,
         d.city,
         COALESCE(d.verified, false),
         d.logo_url,
         d.cover_url,
         d.description,
         NULLIF(btrim(d.community_perk), ''),
         NULLIF(btrim(d.member_perk), ''),
         COALESCE(
           NULLIF(btrim(d.instagram_url), ''),
           CASE WHEN NULLIF(btrim(d.instagram), '') IS NOT NULL
                THEN 'https://instagram.com/' || ltrim(btrim(d.instagram), '@')
           END
         ),
         NULLIF(btrim(d.whatsapp), ''),
         COALESCE(NULLIF(btrim(d.website_url), ''), NULLIF(btrim(d.website), '')),
         NULLIF(btrim(d.address), ''),
         d.latitude,
         d.longitude,
         NULLIF(btrim(d.google_place_id), '')
  FROM public.dealers d
  WHERE d.id = p_id
    AND d.status = 'active'
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_public_partner(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_partner(uuid) TO anon, authenticated, service_role;

COMMENT ON FUNCTION public.get_public_partner(uuid) IS
  'getapexmena.com/dealer/{id}: the public fields of one active partner. Anon-callable on purpose; never add fee or owner columns.';

-- 2. Club ------------------------------------------------------------------------------------------
--   Active clubs only. upcoming_rides: the next five club rides (drives.club_id) that have not started,
--   with the fields the share page and its card show. No invite_code, no owner, no soundtrack.
CREATE OR REPLACE FUNCTION public.get_public_club(p_id uuid)
RETURNS TABLE (
  id uuid,
  name text,
  description text,
  cover_image_url text,
  tribe text,
  join_type text,
  member_count integer,
  max_members integer,
  is_verified boolean,
  upcoming_rides jsonb
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT c.id,
         c.name,
         NULLIF(btrim(c.description), ''),
         c.cover_image_url,
         c.tribe::text,
         c.join_type,
         c.member_count,
         c.max_members,
         c.is_verified,
         COALESCE((
           SELECT jsonb_agg(jsonb_build_object(
                    'id', r.id,
                    'title', r.title,
                    'date_time', r.date_time,
                    'meeting_point', COALESCE(NULLIF(btrim(r.meeting_point_name), ''), NULLIF(btrim(r.meeting_point), ''), NULLIF(btrim(r.start_name), '')),
                    'destination_name', NULLIF(btrim(r.destination_name), ''),
                    'route_distance_km', r.route_distance_km,
                    'count', r.count,
                    'max_participants', r.max_participants,
                    'club_members_only', r.club_members_only
                  ) ORDER BY r.date_time)
           FROM (
             SELECT d.*
             FROM public.drives d
             WHERE d.club_id = c.id
               AND d.status = 'upcoming'
               AND d.date_time >= now()
               AND NOT d.is_flagged_fake
             ORDER BY d.date_time
             LIMIT 5
           ) r
         ), '[]'::jsonb)
  FROM public.clubs c
  WHERE c.id = p_id
    AND c.status = 'active'
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_public_club(uuid) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_public_club(uuid) TO anon, authenticated, service_role;

COMMENT ON FUNCTION public.get_public_club(uuid) IS
  'getapexmena.com/club/{id}: the public fields of one active club plus its next five rides. Anon-callable on purpose; never add invite_code or owner_id.';

COMMIT;
