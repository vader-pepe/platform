import { createClient } from '@supabase/supabase-js'
import { api } from 'encore.dev/api';

const supabase = createClient('https://szhosnfbzqngbyoijyid.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6aG9zbmZienFuZ2J5b2lqeWlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzI1MjkxOTgsImV4cCI6MjA0ODEwNTE5OH0.F-lok3F8LRzkymV6XL5o7ao_KQxiMzr91qNb2hj8zIQ')

export async function getTodos() {
  const { data } = await supabase.from("todos").select();
  return { data } as { data: string[] };
}

export const getTodo = api(
  { expose: true, auth: false, method: "GET", path: "/todo" },
  async (): Promise<{ data: string[] }> => {
    return getTodos();
  }
)
