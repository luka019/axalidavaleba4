-- Exact migration recovered from the project's migration history.
begin;
create table if not exists public.application_reviews (
 application_id uuid primary key references public.applications(id) on delete cascade,
 user_id uuid not null default auth.uid() references public.users(id) on delete cascade,
 checklist jsonb not null default '{}'::jsonb,
 updated_at timestamptz not null default now(),
 constraint review_checklist_object check(jsonb_typeof(checklist)='object' and octet_length(checklist::text)<=4000)
);
alter table public.application_reviews enable row level security;
revoke all on public.application_reviews from public,anon;
grant select,insert,update,delete on public.application_reviews to authenticated;
grant all on public.application_reviews to service_role;
create policy reviews_own on public.application_reviews for all to authenticated using ((select auth.uid())=user_id and exists(select 1 from public.applications a where a.id=application_id and a.user_id=(select auth.uid()))) with check ((select auth.uid())=user_id and exists(select 1 from public.applications a where a.id=application_id and a.user_id=(select auth.uid())));
create or replace function public.ensure_workspace() returns public.applications language plpgsql security invoker set search_path='' as $$
declare uid uuid:=auth.uid(); result public.applications%rowtype;
begin
 if uid is null then raise exception 'Authentication required' using errcode='42501'; end if;
 perform pg_advisory_xact_lock(hashtextextended('workspace:'||uid::text,0));
 insert into public.users(id) values(uid) on conflict(id) do nothing;
 select * into result from public.applications where user_id=uid order by created_at,id limit 1;
 if result.id is null then insert into public.applications(user_id,title) values(uid,'My Chevening Application') returning * into result; end if;
 return result;
end; $$;
revoke all on function public.ensure_workspace() from public,anon;
grant execute on function public.ensure_workspace() to authenticated;
commit;
