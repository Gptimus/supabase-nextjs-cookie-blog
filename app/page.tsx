import { createClient } from "@supabase/supabase-js";

export const revalidate = 60;

const Posts = async () => {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: {
        persistSession: false,
      },
    }
  );

  const { data: posts } = await supabase.from("posts").select();
  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
};

export default Posts;
