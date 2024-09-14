import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { notFound } from "next/navigation";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    revalidatePath("/", "layout");
    redirect("/login");
  }

  // Fetch properties
  let { data } = await supabase
    .rpc("get_all_properties_abstract")
    .throwOnError();

  return (
    <main>
      <ul>
        {data.map((p: any, i: any) => {
          return <li key={"i"}>{p.title}</li>;
        })}
      </ul>
    </main>
  );
}
