
-- Drop all existing tables and their dependencies
DROP TABLE IF EXISTS public.sales_data CASCADE;
DROP TABLE IF EXISTS public.analytics_data CASCADE;
DROP TABLE IF EXISTS public.cameras CASCADE;
DROP TABLE IF EXISTS public.zones CASCADE;
DROP TABLE IF EXISTS public.products CASCADE;
DROP TABLE IF EXISTS public.categories CASCADE;
DROP TABLE IF EXISTS public.stores CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- Drop existing types and functions
DROP TYPE IF EXISTS public.user_role CASCADE;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Create user role enum
CREATE TYPE public.user_role AS ENUM ('manager', 'worker');

-- Create stores table first
CREATE TABLE public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT,
  manager_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role user_role NOT NULL DEFAULT 'worker',
  store_id UUID REFERENCES public.stores(id),
  department TEXT,
  phone TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add foreign key constraint for store manager
ALTER TABLE public.stores ADD CONSTRAINT fk_stores_manager 
  FOREIGN KEY (manager_id) REFERENCES public.profiles(id);

-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  parent_id UUID REFERENCES public.categories(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  sku TEXT UNIQUE NOT NULL,
  category_id UUID REFERENCES public.categories(id),
  price DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2),
  description TEXT,
  image_url TEXT,
  stock_quantity INTEGER DEFAULT 0,
  min_stock_level INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create zones table for store layout
CREATE TABLE public.zones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) NOT NULL,
  name TEXT NOT NULL,
  zone_type TEXT NOT NULL,
  x_position INTEGER,
  y_position INTEGER,
  width INTEGER,
  height INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create cameras table
CREATE TABLE public.cameras (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) NOT NULL,
  zone_id UUID REFERENCES public.zones(id),
  name TEXT NOT NULL,
  camera_type TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  x_position INTEGER,
  y_position INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create analytics data table
CREATE TABLE public.analytics_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) NOT NULL,
  zone_id UUID REFERENCES public.zones(id),
  camera_id UUID REFERENCES public.cameras(id),
  metric_type TEXT NOT NULL,
  metric_value JSONB NOT NULL,
  recorded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create sales data table
CREATE TABLE public.sales_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) NOT NULL,
  product_id UUID REFERENCES public.products(id) NOT NULL,
  zone_id UUID REFERENCES public.zones(id),
  quantity INTEGER NOT NULL,
  unit_price DECIMAL(10,2) NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  transaction_time TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cameras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sales_data ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Managers can view all profiles" ON public.profiles
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Allow profile creation" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

-- Create RLS policies for stores
CREATE POLICY "Managers can manage all stores" ON public.stores
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Workers can view their assigned store" ON public.stores
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND store_id = stores.id
    )
  );

-- Create RLS policies for categories
CREATE POLICY "Managers can manage all categories" ON public.categories
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Workers can view categories" ON public.categories
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create RLS policies for products
CREATE POLICY "Managers can manage all products" ON public.products
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Workers can view products" ON public.products
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Create RLS policies for zones
CREATE POLICY "Managers can manage all zones" ON public.zones
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Workers can view their store zones" ON public.zones
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.store_id = zones.store_id
    )
  );

-- Create RLS policies for cameras
CREATE POLICY "Managers can manage all cameras" ON public.cameras
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Workers can view their store cameras" ON public.cameras
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.store_id = cameras.store_id
    )
  );

-- Create RLS policies for analytics
CREATE POLICY "Managers can manage all analytics" ON public.analytics_data
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Workers can view their store analytics" ON public.analytics_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.store_id = analytics_data.store_id
    )
  );

-- Create RLS policies for sales data
CREATE POLICY "Managers can manage all sales data" ON public.sales_data
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'manager'
    )
  );

CREATE POLICY "Workers can view their store sales data" ON public.sales_data
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles p
      WHERE p.id = auth.uid() AND p.store_id = sales_data.store_id
    )
  );

-- Create the function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role, department)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'worker'),
    CASE 
      WHEN COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'worker') = 'worker' 
      THEN COALESCE(NEW.raw_user_meta_data->>'department', '')
      ELSE NULL
    END
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert sample stores
INSERT INTO public.stores (id, name, location, address) VALUES
  ('550e8400-e29b-41d4-a716-446655440001', 'SmartZone Downtown', 'New York', '123 Main St, New York, NY 10001'),
  ('550e8400-e29b-41d4-a716-446655440002', 'SmartZone Mall', 'Los Angeles', '456 Mall Ave, Los Angeles, CA 90210'),
  ('550e8400-e29b-41d4-a716-446655440003', 'SmartZone Suburban', 'Chicago', '789 Oak St, Chicago, IL 60601');

-- Insert sample categories
INSERT INTO public.categories (id, name, description) VALUES
  ('650e8400-e29b-41d4-a716-446655440001', 'Electronics', 'Electronic devices and accessories'),
  ('650e8400-e29b-41d4-a716-446655440002', 'Clothing', 'Apparel and fashion items'),
  ('650e8400-e29b-41d4-a716-446655440003', 'Grocery', 'Food and beverage items'),
  ('650e8400-e29b-41d4-a716-446655440004', 'Home & Garden', 'Home improvement and garden supplies');

-- Insert sample products
INSERT INTO public.products (id, name, sku, category_id, price, cost, stock_quantity, min_stock_level) VALUES
  ('750e8400-e29b-41d4-a716-446655440001', 'Smartphone Pro', 'PHONE-001', '650e8400-e29b-41d4-a716-446655440001', 899.99, 600.00, 45, 10),
  ('750e8400-e29b-41d4-a716-446655440002', 'Gaming Laptop', 'LAPTOP-001', '650e8400-e29b-41d4-a716-446655440001', 1599.99, 1000.00, 20, 5),
  ('750e8400-e29b-41d4-a716-446655440003', 'Designer T-Shirt', 'SHIRT-001', '650e8400-e29b-41d4-a716-446655440002', 39.99, 18.00, 120, 25),
  ('750e8400-e29b-41d4-a716-446655440004', 'Premium Jeans', 'JEANS-001', '650e8400-e29b-41d4-a716-446655440002', 89.99, 45.00, 80, 15);

-- Insert sample zones
INSERT INTO public.zones (id, store_id, name, zone_type, x_position, y_position, width, height) VALUES
  ('850e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', 'Main Entrance', 'entrance', 0, 0, 100, 50),
  ('850e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', 'Electronics Zone', 'display', 100, 0, 200, 150),
  ('850e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', 'Fashion Zone', 'display', 300, 0, 200, 150),
  ('850e8400-e29b-41d4-a716-446655440004', '550e8400-e29b-41d4-a716-446655440001', 'Checkout Area', 'checkout', 0, 200, 500, 100);

-- Insert sample cameras
INSERT INTO public.cameras (id, store_id, zone_id, name, camera_type, x_position, y_position) VALUES
  ('950e8400-e29b-41d4-a716-446655440001', '550e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440001', 'Entrance Camera 1', 'entrance', 50, 25),
  ('950e8400-e29b-41d4-a716-446655440002', '550e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440002', 'Electronics Overhead', 'overhead', 200, 75),
  ('950e8400-e29b-41d4-a716-446655440003', '550e8400-e29b-41d4-a716-446655440001', '850e8400-e29b-41d4-a716-446655440003', 'Fashion Display Cam', 'shelf', 400, 75);
