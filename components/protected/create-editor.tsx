"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createClient } from "@/utils/supabase/client";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { estateFormSchema } from "@/lib/validation/estate";
import propertyCityConfig from "@/config/property/property-city-config";
import propertyFloorTypeConfig from "@/config/property/property-floor-type-config";
import propertyHeatingTypeConfig from "@/config/property/property-heating-config";
import propertyEnergySourceTypeConfig from "@/config/property/property-energy-source-config";
import propertyConditionTypeConfig from "@/config/property/property-condition-type-config";
import propertyListingTypeConfig from "@/config/property/property-listing-type-config";
import { Loader2 as SpinnerIcon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import propertyTypeConfig from "@/config/property/property-type-type-config";
import { useToast } from "@/hooks/use-toast";

type EditorFormValues = z.infer<typeof estateFormSchema>;

function Editor({ userId }: { userId: String }) {
  const router = useRouter();
  const { toast } = useToast();

  const [isPending, startTransition] = useTransition();

  const defaultValues: Partial<EditorFormValues> = {
    title: "",
    description: "",
    address: "",
    city_id: "",
    price: null,
    condo_fees: null,
    floor: null,
    floor_type_id: null,
    has_elevator: false,
    surface_area: null,
    rooms: null,
    bedrooms: null,
    bathrooms: null,
    terrace_area: null,
    heating_id: null,
    energy_source_id: null,
    year_built: null,
    condition_type_id: "",
    listing_type_id: "",
    has_garage: false,
    has_fireplace: false,
    property_type_id: "",
    videoId: "",
    mapFrame: ""
  };

  const form = useForm<EditorFormValues>({
    resolver: zodResolver(estateFormSchema),
    defaultValues,
    mode: "onChange",
  });

  function onSubmit(data: EditorFormValues) {
    handleCreate(data);
  }

  const handleCreate = async (value: EditorFormValues) => {
    startTransition(async () => {
      const { data, error } = await createClient()
        .from("properties")
        .insert({
          title: value.title,
          description: value.description,
          address: value.address,
          city_id: value.city_id,
          price: value.price,
          condo_fees: value.condo_fees,
          floor: value.floor,
          floor_type_id: value.floor_type_id,
          has_elevator: value.has_elevator,
          surface_area: value.surface_area,
          rooms: value.rooms,
          bedrooms: value.bedrooms,
          bathrooms: value.bathrooms,
          terrace_area: value.terrace_area,
          heating_id: value.heating_id,
          energy_source_id: value.energy_source_id,
          year_built: value.year_built,
          condition_type_id: value.condition_type_id,
          listing_type_id: value.listing_type_id,
          has_garage: value.has_garage,
          has_fireplace: value.has_fireplace,
          property_type_id: value.property_type_id,
          user_id: userId,
          videoId: value.videoId,
          mapFrame: value.mapFrame
        })
        .select()
        .throwOnError();

      if (error) {
        toast({
          title: "Upload error",
          description: error.message,
        });
      }

      toast({
        title: "Upload notice",
        description: "L'operazione è andata a buon fine",
      });

      router.push(`/`);
      router.refresh();
    });
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Title" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <ReactQuill
                    theme="snow"
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <FormDescription>
                  This is the description of the property.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormDescription>
                    This is the address of the property.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city_id"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>

                      <SelectContent>
                        {propertyCityConfig.map((city) => {
                          const { id, title } = city;
                          if (id !== "/") {
                            return (
                              <SelectItem key={id} value={id}>
                                {title}
                              </SelectItem>
                            );
                          }
                          return null;
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    This is the city of the property.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="property_type_id"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Property Type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Property Type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyTypeConfig.map((propertyType) => {
                          const { id, title } = propertyType;
                          if (id !== "/") {
                            return (
                              <SelectItem key={id} value={id}>
                                {title}
                              </SelectItem>
                            );
                          }
                          return null;
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Property Type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Price"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Price</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condo_fees"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Condo Fees</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Condo fees"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Condo fees</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="floor"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Floor</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={-1}
                      placeholder="Floor"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>This is the floor.</FormDescription>
                  <FormMessage />
                </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="floor_type_id"
                render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Floor Type</FormLabel>
                  <FormControl>
                  <div className="flex items-center space-x-2">
                    <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field.value ?? ""}
                    >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Floor type" />
                    </SelectTrigger>
                    <SelectContent>
                      {propertyFloorTypeConfig.map((floorType) => {
                      const { id, title } = floorType;
                      if (id !== "/") {
                        return (
                        <SelectItem key={id} value={id}>
                          {title}
                        </SelectItem>
                        );
                      }
                      return null;
                      })}
                    </SelectContent>
                    </Select>
                    <Button
                    type="button"
                    onClick={() => form.setValue("floor_type_id", null)}
                    className="self-end"
                    >
                    Reset
                    </Button>
                  </div>
                  </FormControl>
                  <FormDescription>This is the floor type.</FormDescription>
                  <FormMessage />
                </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="has_elevator"
                render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Has Elevator</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="False" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Does the property have an elevator?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="surface_area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surface Area</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Surface area"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>Surface Area.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="rooms"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Rooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Rooms"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Rooms.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bedrooms"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Bedrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Bedrooms"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Bedrooms</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="bathrooms"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Bathrooms</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Bathrooms"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Bathrooms</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="terrace_area"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terrace area</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    placeholder="Terrace area"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormDescription>Terrace area</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

            <div className="flex space-x-4">
              <FormField
                control={form.control}
                name="heating_id"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Heating</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Heating" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyHeatingTypeConfig.map((heatingType) => {
                              const { id, title } = heatingType;
                              if (id !== "/") {
                                return (
                                  <SelectItem key={id} value={id}>
                                    {title}
                                  </SelectItem>
                                );
                              }
                              return null;
                            })}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          onClick={() => form.setValue("heating_id", null)}
                          className="self-end"
                        >
                          Reset
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>Heating type</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="energy_source_id"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Energy Source</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Select
                          onValueChange={(value) => field.onChange(value)}
                          value={field.value ?? ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Energy source" />
                          </SelectTrigger>
                          <SelectContent>
                            {propertyEnergySourceTypeConfig.map((energySourceType) => {
                              const { id, title } = energySourceType;
                              if (id !== "/") {
                                return (
                                  <SelectItem key={id} value={id}>
                                    {title}
                                  </SelectItem>
                                );
                              }
                              return null;
                            })}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          onClick={() => form.setValue("energy_source_id", null)}
                          className="self-end"
                        >
                          Reset
                        </Button>
                      </div>
                    </FormControl>
                    <FormDescription>Energy source</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="year_built"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Year built</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="Year built"
                      {...field}
                      value={field.value ?? ""}
                    />
                  </FormControl>
                  <FormDescription>Year built</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="condition_type_id"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Condition type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Condition type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyConditionTypeConfig.map((conditionType) => {
                          const { id, title } = conditionType;
                          if (id !== "/") {
                            return (
                              <SelectItem key={id} value={id}>
                                {title}
                              </SelectItem>
                            );
                          }
                          return null;
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Condition type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="listing_type_id"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Listing type</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Listing type" />
                      </SelectTrigger>
                      <SelectContent>
                        {propertyListingTypeConfig.map((listingType) => {
                          const { id, title } = listingType;
                          if (id !== "/") {
                            return (
                              <SelectItem key={id} value={id}>
                                {title}
                              </SelectItem>
                            );
                          }
                          return null;
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>Listing type</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="has_garage"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Has Garage</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="False" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Does the property have an garage?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="has_fireplace"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Has Fireplace</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={(value) => field.onChange(value)}
                      value={field.value.toString()}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="False" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="true">True</SelectItem>
                        <SelectItem value="false">False</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Does the property have an a fireplace?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex space-x-4">
          <FormField
            control={form.control}
            name="videoId"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Video Id</FormLabel>
                <FormControl>
                  <Input placeholder="Video Id" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="mapFrame"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Map Frame</FormLabel>
                <FormControl>
                  <Input placeholder="Map Frame" {...field} value={field.value ?? ""} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          </div>
          {isPending && <h1>sto ad aspettà</h1>}
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <AlertDialog open={isPending}>
        <AlertDialogContent className="font-sans">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center">Loading</AlertDialogTitle>
            <AlertDialogDescription className="mx-auto text-center">
              <SpinnerIcon className="h-6 w-6 animate-spin" />
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

export default Editor;
