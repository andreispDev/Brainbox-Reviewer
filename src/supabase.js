import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zcugrqeyvzonnwgzzdml.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjdWdycWV5dnpvbm53Z3p6ZG1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzMDE1MDEsImV4cCI6MjA5Nzg3NzUwMX0.VU0b5PCg6JlVYaejtPlPYoQ4EVAj6edO64hBwgMRvH8";

if (!supabaseUrl) {
  throw new Error("VITE_SUPABASE_URL is missing");
}

if (!supabaseAnonKey) {
  throw new Error("VITE_SUPABASE_ANON_KEY is missing");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
