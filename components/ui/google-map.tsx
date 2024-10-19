"use client"

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from '@/utils/supabase/client';

export default function SimpleMap({ id }: { id: string }) {
  const [showMapDialog, setShowMapDialog] = React.useState(false);
  const [mapFrame, setMapFrame] = React.useState<string | null>(null);
  const [isPending, startTransition] = React.useTransition();

  const supabase = createClient();

  React.useEffect(() => {
    const fetchMapFrame = async () => {
      startTransition(async () => {
        const { data, error } = await supabase
          .from('properties')
          .select('mapFrame')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching mapFrame:', error);
        } else {
          setMapFrame(data.mapFrame);
        }
      });
    };

    fetchMapFrame();
  }, [id, supabase]);

  return (
    <>
      <Dialog open={showMapDialog} onOpenChange={setShowMapDialog}>
        <DialogTrigger asChild>
          <Button>
            Show Map
          </Button>
        </DialogTrigger>
        <DialogContent className='w-[900px]'>
          <DialogHeader>
            <DialogTitle>Map</DialogTitle>
            <DialogDescription>
              Here is the map you requested.
            </DialogDescription>
          </DialogHeader>
          <div className="relative h-[450px] w-full overflow-hidden">
            {isPending ? (
                <div className="flex items-center justify-center h-full">
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-300 rounded w-48 mb-4"></div>
                  <div className="h-6 bg-gray-300 rounded w-32"></div>
                </div>
                </div>
            ) : mapFrame ? (
              <div className="absolute inset-0" dangerouslySetInnerHTML={{ __html: mapFrame }} />
            ) : (
              <p>No map available.</p>
            )}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
