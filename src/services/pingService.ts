import { createClient } from "@supabase/supabase-js";
import type { Database, Tables } from "../integrations/supabase/types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type TestPing = Tables<"test_ping">;

export async function getPings(): Promise<TestPing[]> {
  const { data, error } = await supabase.from("test_ping").select("*");
  if (error) throw error;
  return data ?? [];
}
