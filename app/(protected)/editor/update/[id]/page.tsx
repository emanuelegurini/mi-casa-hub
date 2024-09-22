import UpdateEditor from "@/components/protected/update-editor";
import { createClient } from "@/utils/supabase/server";

interface PropertyPageProps {
  params: {
    id: string;
  };
}
async function UpdatePropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  const { data, error } = await createClient()
    .from("properties")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();

  return (
    <>
      {" "}
      <UpdateEditor post={data} />{" "}
    </>
  );
}

export default UpdatePropertyPage;
