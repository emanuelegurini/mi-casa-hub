"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useState, useTransition } from "react";
import { createClient } from "@/utils/supabase/client";

// Skeleton component
const Skeleton = () => (
  <div className="animate-pulse">
    <div className="h-48 bg-gray-300 rounded"></div>
  </div>
);

const PropertyCarousel = (props: { id: string; userID: string }) => {
  const [images, setImages] = useState<any[]>([]);
  const [isPending, startTransition] = useTransition();

  const fetchImages = async () => {
    const supabase = createClient();
    const { data, error } = await supabase.storage
      .from("gallery-image")
      .list(`${props.userID}/${props.id}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (error) {
      console.error("Error fetching images:", error);
    } else {
      setImages(data);
    }
  };

  const handleDialogOpen = () => {
    startTransition(() => {
      fetchImages();
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={handleDialogOpen}>Immagini</Button>
        </DialogTrigger>
        <DialogContent
          onInteractOutside={(e) => {
            e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Property Images</DialogTitle>
            <DialogDescription>
              Browse through the images of the property.
            </DialogDescription>
          </DialogHeader>

          {isPending ? (
            <div className="flex space-x-4">
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </div>
          ) : (
            <Carousel
              opts={{
                align: "start",
              }}
              className="w-full max-w-full"
            >
              <CarouselContent>
                {images.map((image, index) => (
                  <CarouselItem
                    key={index}
                    className="md:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <img
                            src={`https://${process.env.NEXT_PUBLIC_SUPABASE_PROJECT_ID}.supabase.co/storage/v1/object/public/gallery-image/${props.userID}/${props.id}/${image.name}`}
                            alt={`Image ${image.name}`}
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertyCarousel;
