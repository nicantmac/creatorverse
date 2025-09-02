// src/client.js
import { createClient } from '@supabase/supabase-js';

// Settings → API → Project URL (ends with supabase.co)
const URL = import.meta.env.VITE_SUPABASE_URL;
// Settings → API → anon public key
const API_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(URL, API_KEY);
