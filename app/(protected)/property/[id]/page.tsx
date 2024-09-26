import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

const formatter = new Intl.NumberFormat("it", {
  style: "currency",
  currency: "EUR",
});

interface PropertyPageProps {
  params: {
    id: string;
  };
}
async function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  const supabase = createClient();

  const { data, error } = await supabase.rpc("get_property_by_id", {
    property_id: id,
  });
  if (error) throw Error(error.message);

  return (
    <main className="pb-16 lg:pb-24 antialiased">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Property Details
          </h1>
          <div className="flex gap-2">
            <Button className="text-white" asChild>
              <Link href={`/editor/images/${id}`}>Images</Link>
            </Button>
            <Button className="text-white" asChild>
              <Link href={`/editor/update/${id}`}>Update</Link>
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Property ID</TableCell>
                    <TableCell className="text-right">{data.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell className="text-right">{data.title}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left align-top">
                      Description
                    </TableCell>
                    <TableCell className="text-left">
                      <div
                        className="whitespace-pre-wrap"
                        dangerouslySetInnerHTML={{ __html: data.description }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Price Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Price</TableCell>
                    <TableCell className="text-right">
                      {formatter.format(Number(data.price.price))}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Condo Fees</TableCell>
                    <TableCell className="text-right">
                      {data.price.condoFees
                        ? formatter.format(Number(data.price.condoFees))
                        : "No"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Surface Details</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Floor</TableCell>
                    <TableCell className="text-right">
                      {data.surfaceDetail.floor}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Floor Type</TableCell>
                    <TableCell className="text-right">
                      {data.surfaceDetail.floorType}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Surface Area</TableCell>
                    <TableCell className="text-right">
                      {data.surfaceDetail.surfaceArea}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Terrace Area</TableCell>
                    <TableCell className="text-right">
                      {data.surfaceDetail.terraceArea}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Features</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Bathrooms</TableCell>
                    <TableCell className="text-right">
                      {data.features.bathrooms}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bedrooms</TableCell>
                    <TableCell className="text-right">
                      {data.features.bedrooms}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Contract</TableCell>
                    <TableCell className="text-right">
                      {data.features.contract}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Rooms</TableCell>
                    <TableCell className="text-right">
                      {data.features.rooms}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Has Elevator</TableCell>
                    <TableCell className="text-right">
                      {data.features.hasElevator ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Property Type</TableCell>
                    <TableCell className="text-right">
                      {data.features.propertyType}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Other Features</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Has Fireplace</TableCell>
                    <TableCell className="text-right">
                      {data.otherFeatures.hasFireplace ? "Yes" : "No"}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Energy Efficiency</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Property Condition
                    </TableCell>
                    <TableCell className="text-right">
                      {data.energyEfficiency.propertyCondition}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Heating Type</TableCell>
                    <TableCell className="text-right">
                      {data.energyEfficiency.heatingType}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Energy Source</TableCell>
                    <TableCell className="text-right">
                      {data.energyEfficiency.energySource}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

export default PropertyPage;
