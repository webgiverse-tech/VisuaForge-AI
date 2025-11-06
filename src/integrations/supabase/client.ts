import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wanypkscdpcdcaskezat.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Indhbnlwa3NjZHBjZGNhc2tlemF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNDE0NDksImV4cCI6MjA3NzkxNzQ0OX0._EbueWTM9R5m0sAkuNLcDni880pipcCVQVqcEsPUCMA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);