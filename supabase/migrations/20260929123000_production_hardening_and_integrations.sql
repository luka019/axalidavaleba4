
-- ShortlistProof production hardening and entitlement controls.

-- Least-privilege client grants.
revoke all on table
  public.users, public.applications, public.experiences, public.evidence_items,
  public.answers, public.courses, public.career_goals, public.benchmarks,
  public.gaps, public.rechecks, public.challenge_sessions, public.payments,
  public.referrals, public.outcomes, public.winner_comparisons,
  public.contributor_leads, public.product_events
from anon, authenticated;

grant select on public.users to authenticated;
grant insert (id, display_name) on public.users to authenticated;
grant update (display_name, updated_at) on public.users to authenticated;

grant select, insert, update, delete on public.applications to authenticated;
grant select, insert, update, delete on public.experiences to authenticated;
grant select, insert, update, delete on public.evidence_items to authenticated;
grant select, insert, update, delete on public.answers to authenticated;
grant select, insert, update, delete on public.courses to authenticated;
grant select, insert, update, delete on public.career_goals to authenticated;
grant select, insert on public.benchmarks to authenticated;
grant select, update on public.gaps to authenticated;
grant select, insert on public.rechecks to authenticated;
grant select, insert, update, delete on public.challenge_sessions to authenticated;
grant select on public.payments to authenticated;
grant select, insert, update, delete on public.referrals to authenticated;
grant select, insert, update, delete on public.outcomes to authenticated;
grant select on public.winner_comparisons to authenticated;

grant insert on public.contributor_leads to anon, authenticated;
grant insert on public.product_events to anon, authenticated;
grant usage, select on sequence public.product_events_id_seq to anon, authenticated;

-- Public intake sanity limits.
alter table public.contributor_leads
  drop constraint if exists contributor_leads_name_len,
  drop constraint if exists contributor_leads_email_len,
  drop constraint if exists contributor_leads_note_len,
  add constraint contributor_leads_name_len check (char_length(name) between 1 and 120),
  add constraint contributor_leads_email_len check (char_length(email) between 3 and 254),
  add constraint contributor_leads_note_len check (note is null or char_length(note) <= 3000);

create unique index if not exists contributor_leads_email_unique
  on public.contributor_leads(lower(email));

alter table public.product_events
  drop constraint if exists product_events_event_name_len,
  drop constraint if exists product_events_session_key_len,
  drop constraint if exists product_events_payload_size,
  drop constraint if exists product_events_event_name_allowed,
  add constraint product_events_event_name_len check (char_length(event_name) between 1 and 80),
  add constraint product_events_session_key_len check (session_key is null or char_length(session_key) <= 100),
  add constraint product_events_payload_size check (pg_column_size(event_data) <= 16384),
  add constraint product_events_event_name_allowed
    check (event_name in ('landing_view','proof_check_completed','share_result','unlock_clicked','contributor_interest'));

-- Query-path indexes.
create index if not exists benchmarks_answer_id_idx on public.benchmarks(answer_id);
create index if not exists benchmarks_user_id_idx on public.benchmarks(user_id);
create index if not exists challenge_sessions_user_id_idx on public.challenge_sessions(user_id);
create index if not exists evidence_items_experience_id_idx on public.evidence_items(experience_id);
create index if not exists evidence_items_user_id_idx on public.evidence_items(user_id);
create index if not exists gaps_benchmark_id_idx on public.gaps(benchmark_id);
create index if not exists gaps_user_id_idx on public.gaps(user_id);
create index if not exists outcomes_user_id_idx on public.outcomes(user_id);
create index if not exists rechecks_application_id_idx on public.rechecks(application_id);
create index if not exists rechecks_new_benchmark_id_idx on public.rechecks(new_benchmark_id);
create index if not exists rechecks_previous_benchmark_id_idx on public.rechecks(previous_benchmark_id);
create index if not exists rechecks_user_id_idx on public.rechecks(user_id);
create index if not exists referrals_referred_user_id_idx on public.referrals(referred_user_id);
create index if not exists winner_comparisons_answer_id_idx on public.winner_comparisons(answer_id);
create index if not exists payments_payment_intent_idx on public.payments(stripe_payment_intent_id);

-- User-owned benchmark/recheck writes; provider-generated data remains server controlled elsewhere.
drop policy if exists benchmarks_insert_own on public.benchmarks;
create policy benchmarks_insert_own
on public.benchmarks for insert to authenticated
with check ((select auth.uid()) = user_id);

drop policy if exists rechecks_insert_own on public.rechecks;
create policy rechecks_insert_own
on public.rechecks for insert to authenticated
with check ((select auth.uid()) = user_id);

-- Payment constraints.
alter table public.payments alter column currency set default 'gbp';

alter table public.payments
  drop constraint if exists payments_currency_check,
  drop constraint if exists payments_product_key_check,
  add constraint payments_currency_check check (currency ~ '^[a-z]{3}$'),
  add constraint payments_product_key_check check (product_key in ('full_shortlistproof'));

-- Server-only integration secret store.
create table if not exists private.integration_secrets (
  name text primary key,
  value text not null,
  updated_at timestamptz not null default timezone('utc',now())
);
alter table private.integration_secrets enable row level security;
revoke all on table private.integration_secrets from public, anon, authenticated;

create or replace function public.get_server_integration_secret(p_name text)
returns text
language sql
security definer
set search_path = ''
as $$
  select value from private.integration_secrets where name=p_name
$$;
revoke all on function public.get_server_integration_secret(text) from public, anon, authenticated;
grant execute on function public.get_server_integration_secret(text) to service_role;

-- Azure Foundry / AI Search configuration metadata (no secrets stored here).
create table if not exists private.ai_provider_config (
  provider text primary key,
  enabled boolean not null default false,
  project_endpoint text,
  agent_name text,
  model_deployment text,
  api_version text not null default 'v1',
  search_endpoint text,
  search_index text,
  search_api_version text not null default '2026-08-01-preview',
  updated_at timestamptz not null default timezone('utc',now()),
  constraint ai_provider_config_provider_check check (provider in ('azure_foundry'))
);
alter table private.ai_provider_config enable row level security;
revoke all on table private.ai_provider_config from public, anon, authenticated;

insert into private.ai_provider_config(provider,enabled)
values ('azure_foundry',false)
on conflict(provider) do nothing;
