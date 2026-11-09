-- APEX website enquiries. Run this once in the Supabase SQL Editor (project lsstkxtzttvdwetwehwm).
-- Only the service role (inside the enquiry-notify edge function) can read or write these tables:
-- RLS is on and there are deliberately NO policies, so the anon/publishable key gets nothing.

create table if not exists public.partner_enquiries (
  id             uuid primary key default gen_random_uuid(),
  created_at     timestamptz not null default now(),
  locale         text not null default 'en' check (locale in ('en', 'ar')),
  business_name  text not null check (char_length(business_name) between 2 and 160),
  contact_name   text not null check (char_length(contact_name) between 2 and 120),
  partner_type   text not null check (partner_type in ('dealer', 'shop', 'ride_stop')),
  city           text not null check (char_length(city) between 2 and 80),
  email          text not null check (char_length(email) between 5 and 254),
  phone          text check (phone is null or char_length(phone) between 5 and 32),
  ip_hash        text,
  notified_at    timestamptz,
  notify_error   text
);

create table if not exists public.concierge_requests (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  locale        text not null default 'en' check (locale in ('en', 'ar')),
  name          text not null check (char_length(name) between 2 and 120),
  email         text not null check (char_length(email) between 5 and 254),
  topic         text not null check (char_length(topic) between 2 and 60),
  message       text not null check (char_length(message) between 12 and 4000),
  ip_hash       text,
  notified_at   timestamptz,
  notify_error  text
);

-- Rate-limit lookups (the function counts recent rows per hashed IP).
create index if not exists partner_enquiries_ip_recent  on public.partner_enquiries  (ip_hash, created_at desc);
create index if not exists concierge_requests_ip_recent on public.concierge_requests (ip_hash, created_at desc);

alter table public.partner_enquiries  enable row level security;
alter table public.concierge_requests enable row level security;

-- Belt and braces: no table privileges for the public roles either.
revoke all on public.partner_enquiries  from anon, authenticated;
revoke all on public.concierge_requests from anon, authenticated;
