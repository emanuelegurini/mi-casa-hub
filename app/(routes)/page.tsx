import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";
import { AbstractProperties } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function Home() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    revalidatePath("/", "layout");
    redirect("/login");
  }

  const { data } = await supabase
    .rpc("get_all_properties_abstract")
    .returns<AbstractProperties[]>()
    .throwOnError();

  /*     id: String;
    address: String | null;
    price: number;
    city: String | null;
    contract: String | null;
    surfacearea: number;
    propertytype: String[]; */

  return (
    <main>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">Immobile</TableHead>
            <TableHead>Città</TableHead>
            <TableHead>Contratto</TableHead>
            <TableHead>Superficie</TableHead>
            <TableHead>Prezzo</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((p) => {
            const {
              id,
              propertytype = [],
              address = "",
              city = "",
              contract = "",
              price,
              surfacearea,
            } = p;

            return (
              <TableRow key={"id-" + id}>
                <TableCell className="font-medium">
                  <span className="capitalize">{propertytype[0]}</span>{" "}
                  {address}
                </TableCell>
                <TableCell className="capitalize">{city}</TableCell>
                <TableCell>{contract}</TableCell>
                <TableCell>{surfacearea}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell className="text-center">
                  <Button asChild>
                    <Link href={`./property/${id}`}>Apri</Link>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
