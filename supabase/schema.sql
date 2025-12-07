-- Enable UUID extension if not enabled
create extension if not exists "uuid-ossp";

-- Create libraries table
create table libraries (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  is_public boolean default false,
  owner_id uuid references auth.users(id),
  content jsonb not null, -- Stores structure: { functionBlocks: [...] }
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable RLS
alter table libraries enable row level security;

-- Policy: Everyone can read public libraries
create policy "Public libraries are viewable by everyone" 
  on libraries for select 
  using ( is_public = true );

-- Policy: Users can see their own libraries
create policy "Users can see own libraries" 
  on libraries for select 
  using ( auth.uid() = owner_id );

-- Policy: Users can insert their own libraries
create policy "Users can insert own libraries" 
  on libraries for insert 
  with check ( auth.uid() = owner_id );

-- Policy: Users can update their own libraries
create policy "Users can update own libraries" 
  on libraries for update 
  using ( auth.uid() = owner_id );

-- Policy: Users can delete their own libraries
create policy "Users can delete own libraries" 
  on libraries for delete 
  using ( auth.uid() = owner_id );
