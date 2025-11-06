-- Add 'role' column to profiles table if it doesn't exist
DO $$ BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='profiles' AND column_name='role') THEN
        ALTER TABLE public.profiles ADD COLUMN role TEXT DEFAULT 'user' NOT NULL;
    END IF;
END $$;

-- Update RLS policies for profiles to include the new role column if needed (existing policies should still work with new column)
-- No explicit change needed for existing policies if they don't reference 'role' for basic user access.

-- Create generated_images table with RLS
CREATE TABLE IF NOT EXISTS public.generated_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  image_url TEXT NOT NULL,
  prompt TEXT,
  style TEXT,
  mode TEXT NOT NULL, -- 'generate' or 'edit'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS for generated_images (REQUIRED)
ALTER TABLE public.generated_images ENABLE ROW LEVEL SECURITY;

-- Policies for generated_images
CREATE POLICY "Users can view their own generated images" ON public.generated_images
FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own generated images" ON public.generated_images
FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own generated images" ON public.generated_images
FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own generated images" ON public.generated_images
FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- Update handle_new_user function to include 'role'
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE PLPGSQL
SECURITY DEFINER SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, role)
  VALUES (
    new.id,
    new.raw_user_meta_data ->> 'first_name',
    new.raw_user_meta_data ->> 'last_name',
    'user' -- Default role for new users
  );
  RETURN new;
END;
$$;

-- Recreate trigger to ensure it uses the updated function
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();