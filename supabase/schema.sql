-- Super Kicks Database Schema
-- Run this in the Supabase SQL editor to create all tables

-- ============================================================
-- PROFILES (extends Supabase auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  first_name text not null default '',
  last_name text not null default '',
  email text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view their own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, first_name, last_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'first_name', ''),
    coalesce(new.raw_user_meta_data ->> 'last_name', ''),
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ============================================================
-- CATEGORIES
-- ============================================================
create table if not exists public.categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique,
  slug text not null unique,
  description text,
  image_url text
);

alter table public.categories enable row level security;

create policy "Categories are publicly readable"
  on public.categories for select
  using (true);

-- ============================================================
-- PRODUCTS
-- ============================================================
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  gender text check (gender in ('Men', 'Women', 'Unisex')),
  color text,
  size text,
  category_id uuid references public.categories(id) on delete set null,
  price numeric(10,2) not null default 0,
  discount_percent integer not null default 0,
  discounted_price numeric(10,2) not null default 0,
  on_sale boolean not null default false,
  out_of_stock boolean not null default false,
  rating_avg numeric(2,1) not null default 0,
  rating_count integer not null default 0,
  trending boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Products are publicly readable"
  on public.products for select
  using (true);

-- ============================================================
-- CART_ITEMS
-- ============================================================
create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  quantity integer not null default 1 check (quantity > 0),
  unique (user_id, product_id)
);

alter table public.cart_items enable row level security;

create policy "Users can view their own cart"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "Users can add to their own cart"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own cart"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "Users can remove from their own cart"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ============================================================
-- WISHLIST_ITEMS
-- ============================================================
create table if not exists public.wishlist_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  unique (user_id, product_id)
);

alter table public.wishlist_items enable row level security;

create policy "Users can view their own wishlist"
  on public.wishlist_items for select
  using (auth.uid() = user_id);

create policy "Users can add to their own wishlist"
  on public.wishlist_items for insert
  with check (auth.uid() = user_id);

create policy "Users can remove from their own wishlist"
  on public.wishlist_items for delete
  using (auth.uid() = user_id);

-- ============================================================
-- ORDERS
-- ============================================================
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  status text not null default 'confirmed' check (status in ('confirmed', 'processing', 'shipped', 'delivered', 'cancelled')),
  total numeric(10,2) not null default 0,
  shipping_address jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Users can view their own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can create their own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ============================================================
-- ORDER_ITEMS
-- ============================================================
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete set null,
  quantity integer not null default 1,
  price_at_purchase numeric(10,2) not null
);

alter table public.order_items enable row level security;

create policy "Users can view their own order items"
  on public.order_items for select
  using (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

create policy "Users can insert their own order items"
  on public.order_items for insert
  with check (
    exists (
      select 1 from public.orders
      where orders.id = order_items.order_id
      and orders.user_id = auth.uid()
    )
  );

-- ============================================================
-- REVIEWS
-- ============================================================
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  product_id uuid not null references public.products(id) on delete cascade,
  rating integer not null check (rating >= 1 and rating <= 5),
  comment text,
  created_at timestamptz not null default now(),
  unique (user_id, product_id)
);

alter table public.reviews enable row level security;

create policy "Reviews are publicly readable"
  on public.reviews for select
  using (true);

create policy "Authenticated users can insert reviews"
  on public.reviews for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own reviews"
  on public.reviews for update
  using (auth.uid() = user_id);

create policy "Users can delete their own reviews"
  on public.reviews for delete
  using (auth.uid() = user_id);

-- ============================================================
-- ADDRESSES
-- ============================================================
create table if not exists public.addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  name text not null,
  mobile_no text not null,
  street text not null,
  city text not null,
  pincode text not null,
  is_default boolean not null default false
);

alter table public.addresses enable row level security;

create policy "Users can view their own addresses"
  on public.addresses for select
  using (auth.uid() = user_id);

create policy "Users can add their own addresses"
  on public.addresses for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own addresses"
  on public.addresses for update
  using (auth.uid() = user_id);

create policy "Users can delete their own addresses"
  on public.addresses for delete
  using (auth.uid() = user_id);
