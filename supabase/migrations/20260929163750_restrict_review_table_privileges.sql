-- Exact migration recovered from the project's migration history.
revoke all privileges on table public.application_reviews from anon;
revoke truncate, references, trigger on table public.application_reviews from authenticated;
grant select, insert, update, delete on public.application_reviews to authenticated;
