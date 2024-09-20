import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PropertyPageProps {
  params: {
    id: string;
  };
}
async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  return (
    <>
      <div>Property id: {id}</div>
      <Button asChild>
        <Link href={`/editor/update/${id}`}>Update</Link>
      </Button>
    </>
  );
}

export default PropertyPage;
