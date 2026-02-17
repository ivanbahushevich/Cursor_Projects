create extension if not exists "pgcrypto";

create table if not exists public.words (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  term text not null,
  translation text not null,
  created_at timestamptz not null default now(),
  next_review timestamptz not null default now(),
  interval_days integer not null default 1
);

alter table public.words enable row level security;

create policy "Users can view their words"
  on public.words
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their words"
  on public.words
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their words"
  on public.words
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their words"
  on public.words
  for delete
  using (auth.uid() = user_id);
create extension if not exists "pgcrypto";

create table if not exists public.words (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  term text not null,
  translation text not null,
  created_at timestamptz not null default now(),
  next_review timestamptz not null default now(),
  interval_days integer not null default 1
);

create index if not exists words_user_id_idx on public.words (user_id);
create index if not exists words_next_review_idx on public.words (next_review);

alter table public.words enable row level security;

create policy "Users can view their words"
  on public.words
  for select
  using (auth.uid() = user_id);

create policy "Users can insert their words"
  on public.words
  for insert
  with check (auth.uid() = user_id);

create policy "Users can update their words"
  on public.words
  for update
  using (auth.uid() = user_id);

create policy "Users can delete their words"
  on public.words
  for delete
  using (auth.uid() = user_id);
