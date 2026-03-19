-- Create tables
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name text,
  face_descriptor jsonb,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.meetings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  title text NOT NULL,
  duration_seconds integer,
  audio_url text,
  transcript text,
  summary text,
  decisions jsonb,
  action_items jsonb,
  status text NOT NULL CHECK (status IN ('uploading', 'transcribing', 'summarising', 'ready')),
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Meetings policies
CREATE POLICY "Users can view their own meetings" ON public.meetings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own meetings" ON public.meetings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own meetings" ON public.meetings FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own meetings" ON public.meetings FOR DELETE USING (auth.uid() = user_id);

-- Storage bucket setup (for manual configuration in dashboard or via SQL if superuser)
INSERT INTO storage.buckets (id, name, public) 
VALUES ('meeting-recordings', 'meeting-recordings', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload their own recordings" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'meeting-recordings' AND auth.uid() = owner);
CREATE POLICY "Users can read their own recordings" ON storage.objects FOR SELECT USING (bucket_id = 'meeting-recordings' AND auth.uid() = owner);
CREATE POLICY "Users can update their own recordings" ON storage.objects FOR UPDATE USING (bucket_id = 'meeting-recordings' AND auth.uid() = owner);
CREATE POLICY "Users can delete their own recordings" ON storage.objects FOR DELETE USING (bucket_id = 'meeting-recordings' AND auth.uid() = owner);
