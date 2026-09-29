
alter table public.applications
  add column if not exists onboarding_step smallint,
  add column if not exists onboarding_completed_at timestamptz,
  add column if not exists onboarding_dismissed_at timestamptz;

-- Existing workspaces should not be forced through a newly introduced wizard.
update public.applications
set onboarding_step=5,
    onboarding_completed_at=coalesce(onboarding_completed_at, timezone('utc',now()))
where onboarding_step is null;

alter table public.applications
  alter column onboarding_step set default 1,
  alter column onboarding_step set not null;

alter table public.applications
  drop constraint if exists applications_onboarding_step_check,
  add constraint applications_onboarding_step_check check (onboarding_step between 1 and 5);
