import "../globals.css";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import MainHeader from "@/components/protected/main/header/main-header";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user.id) {
    redirect("/login");
  }

  return (
    <>
      <MainHeader />
      {children}
    </>
  );
}
