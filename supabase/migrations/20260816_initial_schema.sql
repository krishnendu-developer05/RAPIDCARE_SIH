-- ==========================================
-- RapidCare PostgreSQL Schema & PostGIS Init
-- ==========================================

-- 1. Enable PostGIS Extension for geospatial queries
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Hospitals Table
CREATE TABLE IF NOT EXISTS public.hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    latitude DOUBLE PRECISION NOT NULL,
    longitude DOUBLE PRECISION NOT NULL,
    phone TEXT,
    emergency_rating NUMERIC(2, 1) DEFAULT 4.5,
    available_beds INTEGER DEFAULT 10,
    image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Ambulances Table
CREATE TABLE IF NOT EXISTS public.ambulances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID REFERENCES public.hospitals(id) ON DELETE SET NULL,
    vehicle_number TEXT NOT NULL,
    driver_name TEXT NOT NULL,
    driver_phone TEXT NOT NULL,
    ambulance_type TEXT CHECK (ambulance_type IN ('basic', 'advanced', 'transport')) DEFAULT 'basic',
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_available BOOLEAN DEFAULT TRUE,
    price_base NUMERIC(10, 2) DEFAULT 450.00,
    eta_minutes INTEGER DEFAULT 10,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Bookings Table
CREATE TABLE IF NOT EXISTS public.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_name TEXT NOT NULL,
    user_phone TEXT NOT NULL,
    pickup_address TEXT NOT NULL,
    pickup_lat DOUBLE PRECISION,
    pickup_lng DOUBLE PRECISION,
    hospital_id UUID REFERENCES public.hospitals(id) ON DELETE SET NULL,
    ambulance_id UUID REFERENCES public.ambulances(id) ON DELETE SET NULL,
    ambulance_type TEXT DEFAULT 'basic',
    booking_status TEXT CHECK (booking_status IN ('pending', 'assigned', 'en_route', 'arrived', 'completed', 'cancelled')) DEFAULT 'assigned',
    payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'cash_on_delivery')) DEFAULT 'pending',
    payment_method TEXT DEFAULT 'upi',
    total_amount NUMERIC(10, 2) DEFAULT 450.00,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PostGIS Function: Get Nearby Hospitals Sorted by Distance
CREATE OR REPLACE FUNCTION get_nearby_hospitals(
    user_lat DOUBLE PRECISION,
    user_lng DOUBLE PRECISION,
    max_dist_km DOUBLE PRECISION DEFAULT 50.0
)
RETURNS TABLE (
    id UUID,
    name TEXT,
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    phone TEXT,
    emergency_rating NUMERIC,
    available_beds INTEGER,
    distance_km DOUBLE PRECISION
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        h.id,
        h.name,
        h.address,
        h.latitude,
        h.longitude,
        h.phone,
        h.emergency_rating,
        h.available_beds,
        ROUND((ST_DistanceSphere(ST_MakePoint(user_lng, user_lat), ST_MakePoint(h.longitude, h.latitude)) / 1000.0)::numeric, 2)::DOUBLE PRECISION AS distance_km
    FROM public.hospitals h
    WHERE ST_DistanceSphere(ST_MakePoint(user_lng, user_lat), ST_MakePoint(h.longitude, h.latitude)) <= (max_dist_km * 1000.0)
    ORDER BY distance_km ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 6. Row Level Security (RLS) Policies
ALTER TABLE public.hospitals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ambulances ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

-- Allow public read access to hospitals and ambulances
CREATE POLICY "Public read hospitals" ON public.hospitals FOR SELECT USING (true);
CREATE POLICY "Public read ambulances" ON public.ambulances FOR SELECT USING (true);
CREATE POLICY "Public read/write bookings" ON public.bookings FOR ALL USING (true);

-- 7. Realtime Enablement for Live Tracking
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookings;
ALTER PUBLICATION supabase_realtime ADD TABLE public.ambulances;

-- ==========================================
-- Seed Initial Emergency Hospital Data
-- ==========================================
INSERT INTO public.hospitals (name, address, latitude, longitude, phone, emergency_rating, available_beds)
VALUES 
('Chakdaha State General Hospital', 'Chakdaha, Nadia, West Bengal 741222', 23.0805, 88.5284, '+91 3473 242 222', 4.8, 18),
('College of Medicine & JNM Hospital', 'Kalyani, Nadia, West Bengal 741235', 22.9751, 88.4344, '+91 33 2582 8263', 4.9, 42),
('AIIMS Kalyani Emergency Care', 'NH-34 Connector, Basantapur, Kalyani 741245', 22.9587, 88.4552, '+91 33 2951 6004', 5.0, 65),
('Ranaghat Sub-Divisional Hospital', 'Ranaghat, Nadia, West Bengal 741201', 23.1789, 88.5833, '+91 3473 210 110', 4.6, 24),
('Apollo Multispeciality Hospitals', '58 Canal Circular Rd, Kadapara, Kolkata 700054', 22.5697, 88.3968, '+91 33 2320 3040', 4.9, 85),
('SSKM Government Hospital & Trauma Care', '244 AJC Bose Rd, Bhowanipore, Kolkata 700020', 22.5385, 88.3444, '+91 33 2223 1589', 4.7, 110)
ON CONFLICT DO NOTHING;

-- Seed Sample Ambulances
INSERT INTO public.ambulances (vehicle_number, driver_name, driver_phone, ambulance_type, latitude, longitude, is_available, price_base, eta_minutes)
VALUES
('WB 24 AC 1080', 'Rajesh Kumar', '+91 98765 43210', 'basic', 23.0810, 88.5290, TRUE, 450.00, 9),
('WB 24 AC 2024', 'Amit Sharma', '+91 98765 43211', 'advanced', 23.0825, 88.5310, TRUE, 850.00, 12),
('WB 24 AC 3099', 'Subhashish Das', '+91 98765 43212', 'transport', 23.0790, 88.5260, TRUE, 300.00, 15)
ON CONFLICT DO NOTHING;
