import UpdateEditor from "@/components/protected/update-editor";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";

interface PropertyPageProps {
  params: {
    id: string;
  };
}
async function UpdatePropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  /*  const { data, error } = await createClient().rpc("get_property_by_id", {
    property_id: id,
  });
  if (error) console.error(error);
  else console.log(data); */

  const { data, error } = await createClient()
    .from("properties")
    .select("*")
    .eq("id", id)
    .single()
    .throwOnError();

  console.log("data", data);

  return (
    <>
      {" "}
      <UpdateEditor post={data} />{" "}
    </>
  );
}

export default UpdatePropertyPage;
