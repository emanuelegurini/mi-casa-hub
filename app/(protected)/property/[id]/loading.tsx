import UploadImages from "@/components/protected/property-detail/upload-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Table } from "lucide-react";

function SkeletonLoader() {
  return (
    <div className="animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
      <div className="h-4 bg-gray-300 rounded w-full mb-4"></div>
    </div>
  );
}

function Loading() {
  return (
    <main className="pb-16 lg:pb-24 antialiased">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-semibold text-gray-800">
            Property Details
          </h1>
          <Button className="text-white" disabled>
            Update
          </Button>
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
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Title</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium text-left">
                      Description
                    </TableCell>
                    <TableCell className="text-left">
                      <SkeletonLoader />
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
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Condo Fees</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
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
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Floor Type</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Surface Area</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Terrace Area</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
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
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Bedrooms</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Contract</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Rooms</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Has Elevator</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Property Type</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
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
                      <SkeletonLoader />
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
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Heating Type</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Energy Source</TableCell>
                    <TableCell className="text-right">
                      <SkeletonLoader />
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

export default Loading;
