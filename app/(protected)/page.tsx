import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { AbstractProperties } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import DeletePropertyButton from "@/components/protected/property-detail/delete-property";

const formatter = new Intl.NumberFormat("it", {
  style: "currency",
  currency: "EUR",
});

export default async function Home() {
  const supabase = createClient();

  const { data } = await supabase
    .rpc("get_all_properties_abstract")
    .returns<AbstractProperties[]>()
    .throwOnError();

  return (
    <main>
      <div className="mb-4">
        <Button asChild>
          <Link href={`/editor/create`}>New</Link>
        </Button>
      </div>
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
              propertytype = "",
              address = "",
              city = "",
              contract = "",
              price,
              surfacearea,
            } = p;

            return (
              <TableRow key={"id-" + id}>
                <TableCell className="font-medium">
                  <span className="capitalize">{propertytype}</span> {address}
                </TableCell>
                <TableCell className="capitalize">{city}</TableCell>
                <TableCell>{contract}</TableCell>
                <TableCell>{surfacearea}</TableCell>
                <TableCell>{formatter.format(Number(price))}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2">
                    <Button asChild>
                      <Link href={`./property/${id}`}>Apri</Link>
                    </Button>
                    <DeletePropertyButton id={id} />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </main>
  );
}
