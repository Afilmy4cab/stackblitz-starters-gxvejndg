import { createClient } from '@supabase/supabase-js';

// यहाँ अपनी Project URL और anon key पेस्ट करें (इनवर्टेड कॉमा के अंदर)
const supabaseUrl = 'https://qesfxgmqmjgksrqtlmtq.supabase.co/rest/v1/';
const supabaseKey = 'sb_publishable_mmeJlb80NkWij-7z5baJcQ_m7SPk4ZS';

export const supabase = createClient(supabaseUrl, supabaseKey);
