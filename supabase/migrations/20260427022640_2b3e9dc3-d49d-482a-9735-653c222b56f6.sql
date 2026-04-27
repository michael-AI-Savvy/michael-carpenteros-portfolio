-- Create testimonials table
CREATE TABLE public.testimonials (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT,
  company TEXT,
  message TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  approved BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Validation trigger (length & rating bounds)
CREATE OR REPLACE FUNCTION public.validate_testimonial()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF length(trim(NEW.name)) < 1 OR length(NEW.name) > 100 THEN
    RAISE EXCEPTION 'Name must be between 1 and 100 characters';
  END IF;
  IF length(trim(NEW.message)) < 10 OR length(NEW.message) > 600 THEN
    RAISE EXCEPTION 'Message must be between 10 and 600 characters';
  END IF;
  IF NEW.role IS NOT NULL AND length(NEW.role) > 100 THEN
    RAISE EXCEPTION 'Role must be less than 100 characters';
  END IF;
  IF NEW.company IS NOT NULL AND length(NEW.company) > 100 THEN
    RAISE EXCEPTION 'Company must be less than 100 characters';
  END IF;
  IF NEW.rating < 1 OR NEW.rating > 5 THEN
    RAISE EXCEPTION 'Rating must be between 1 and 5';
  END IF;
  -- Force approved=false on insert (cannot self-approve)
  IF TG_OP = 'INSERT' THEN
    NEW.approved := false;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_testimonial_trigger
BEFORE INSERT OR UPDATE ON public.testimonials
FOR EACH ROW EXECUTE FUNCTION public.validate_testimonial();

-- Enable RLS
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;

-- Anyone can read approved testimonials
CREATE POLICY "Anyone can view approved testimonials"
ON public.testimonials
FOR SELECT
USING (approved = true);

-- Anyone can insert a testimonial (will be unapproved by trigger)
CREATE POLICY "Anyone can submit a testimonial"
ON public.testimonials
FOR INSERT
WITH CHECK (true);

-- Index for ordering
CREATE INDEX idx_testimonials_approved_created ON public.testimonials (approved, created_at DESC);