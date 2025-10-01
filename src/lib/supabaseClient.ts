import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://tbqqwefihfcknceqvicp.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRicXF3ZWZpaGZja25jZXF2aWNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5ODMyNTEsImV4cCI6MjA3NDU1OTI1MX0.rwKHkDXL0AHQdqjYiDFrfqaQkvUepu7aiAA_V2K4TKo"
);
