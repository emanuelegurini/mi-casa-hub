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
      <main className="m-auto w-full max-w-[1200px] flex-1 p-4">
        <MainHeader />
        {children}
      </main>
    </>
  );
}
