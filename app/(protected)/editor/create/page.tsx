import Editor from "@/components/protected/create-editor";
import { createClient } from "@/utils/supabase/server";

async function CreatePropertyPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <Editor userId={user?.id!} />
    </>
  );
}

export default CreatePropertyPage;
