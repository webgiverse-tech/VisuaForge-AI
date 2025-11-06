import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wanypkscdpcdcaskezat.supabase.co';
const supabaseAnonKey = 'sb_publishable_wTEH2y56UF34cknLzgcc3A_Eu-jPdQJ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);