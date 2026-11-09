# Enquiry backend: run these yourself

The website never holds the service role key. Its forms post (server to server) to the `enquiry-notify` edge function. The function checks a shared secret and Turnstile, rate-limits, inserts with the service role, and sends you an Expo push.

## 1. Tables (Supabase SQL Editor)

Paste and run `supabase/sql/2026-11-09_enquiries.sql`.

## 2. Turnstile keys

Cloudflare dashboard → Turnstile → Add widget. Hostnames: `getapexmena.com`, `www.getapexmena.com`, `localhost` and your `*.vercel.app` preview host. Mode: **Managed**. You get a **site key** (public) and a **secret key**.

## 3. Function secrets (Supabase only)

```bash
# from /Users/linkshadow/apex-website
npx supabase login                      # once
SECRET=$(openssl rand -hex 32); echo "$SECRET"   # copy this; Vercel needs the same value

npx supabase secrets set --project-ref lsstkxtzttvdwetwehwm \
  ENQUIRY_SHARED_SECRET="$SECRET" \
  TURNSTILE_SECRET_KEY="<turnstile secret key>" \
  ENQUIRY_NOTIFY_USER_ID="<your users.id UUID>"
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected into every edge function automatically. Don't set them.

## 4. Deploy the function

```bash
npx supabase functions deploy enquiry-notify --project-ref lsstkxtzttvdwetwehwm --no-verify-jwt
```

`--no-verify-jwt` is intentional. The caller authenticates with `x-enquiry-secret`, and the project's publishable key (`sb_publishable_…`) is not a JWT the gateway could verify. The function rejects any request without the secret (401) or a valid Turnstile token (403).

## 5. Vercel env (Preview + Production)

```bash
vercel env add ENQUIRY_SHARED_SECRET            # the same $SECRET as above, server-only
vercel env add NEXT_PUBLIC_TURNSTILE_SITE_KEY   # the Turnstile site key
# NEXT_PUBLIC_SUPABASE_ANON_KEY already exists (publishable key); NO service role key in Vercel.
```

Then redeploy the preview.

## 6. Test

Submit the partner form on the preview. You should get a push titled **"New partner enquiry · Dealer"**. Check the row:

```sql
select created_at, business_name, partner_type, notified_at, notify_error
from public.partner_enquiries order by created_at desc limit 5;
```

`notify_error` is filled when the row was saved but the push failed (for example, no `expo_push_token` on your user). The visitor still sees success, because their enquiry is safe.

## Function responses

| Status | Meaning | What the website shows |
|---|---|---|
| 200 `{ok, id, notified}` | saved (and pushed when `notified`) | the sent line |
| 401 | wrong or missing secret | "can't send right now" |
| 403 `turnstile_failed` | bot check failed or expired | "check failed, try again" + reset widget |
| 422 `{fields}` | invalid field | the error under each field |
| 429 | more than 5 sends from one IP in 10 minutes | "too many sends, try later" |
| 500 / 503 | insert failed or function misconfigured | "can't send right now"; typing kept |
