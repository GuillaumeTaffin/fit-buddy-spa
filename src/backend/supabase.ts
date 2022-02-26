import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://dgkfawvhhnebudaxalqd.supabase.co';
const supabaseAnonKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRna2Zhd3ZoaG5lYnVkYXhhbHFkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDUwMTUxNDcsImV4cCI6MTk2MDU5MTE0N30.wdbgbIuRZBdgd2H1FJOU0V5hblKc3vE1LKI8H33JWmQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
