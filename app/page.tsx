import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

//export const revalidate = 60;

const Posts = async () => {
  const supabase = createServerComponentClient({
    cookies,
  });

  const { data: posts } = await supabase.from("posts").select();
  return <pre>{JSON.stringify(posts, null, 2)}</pre>;
};

export default Posts;
