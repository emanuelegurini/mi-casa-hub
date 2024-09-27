"use client";

import { Button } from "@/components/ui/button";
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
import { createClient } from "@/utils/supabase/client";
import { TrashIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import * as React from "react";
import { useRouter } from "next/navigation";

export default function DeletePropertyButton(props: { id: String }) {
  const { id } = props;
  const { toast } = useToast();
  const router = useRouter();
  const [showDeleteTaskDialog, setShowDeleteTaskDialog] = React.useState(false);

  const [isPending, startTransition] = React.useTransition();

  const onDelete = () => {
    startTransition(async () => {
      const response = await createClient()
        .from("properties")
        .delete()
        .eq("id", id);

      if (response.error) {
        toast({
          title: "Upload notice",
          description: response.error.message,
        });
      } else {
        toast({
          title: "Upload notice",
          description: "Property deleted successfully",
        });
      }

      setShowDeleteTaskDialog(false);
      router.refresh();
    });
  };

  return (
    <>
      <Dialog
        open={showDeleteTaskDialog}
        onOpenChange={setShowDeleteTaskDialog}
      >
        <DialogTrigger asChild>
          <Button variant="destructive">
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. It will permanently delete this
              property from the database.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2 sm:space-x-0">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              aria-label="Delete selected repository"
              variant="destructive"
              onClick={onDelete}
              disabled={isPending}
            >
              {isPending && (
                <svg
                  className="mr-2 size-4 animate-spin"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
