'use client'

import React from 'react'
import { useToast } from "@/hooks/use-toast";
import { createClient } from "@/utils/supabase/client";
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
import { TrashIcon } from "lucide-react";

function ImageWithDeleteButton({ children, id, fileName, dir }: { children: React.ReactNode, id: string, fileName: string, dir: "gallery-image" | "cover-image" }) {
	const { toast } = useToast();
	const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
	const [isPending, startTransition] = React.useTransition();

	const handleDelete = async () => {
		startTransition(async () => {
			const {
				data: { user },
			} = await createClient().auth.getUser();

			const { error } = await createClient()
				.storage.from(dir)
				.remove([`${user?.id}/${id}/${fileName}`]);

			if (error) {
				toast({
					title: "Delete Error",
					description: error.message,
				});
			} else {
				toast({
					title: "Delete notice",
					description: "File deleted successfully",
				});
			
				window.location.reload(); // Update the page
			}

			setShowDeleteDialog(false);
		});
	};

	return (
		<>
				<div className="relative inline-block">
					{children}
					<Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
						<DialogTrigger asChild>
							<button
								className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full"
								aria-label="Delete image"
							>
								<TrashIcon className="h-4 w-4" aria-hidden="true" />
							</button>
						</DialogTrigger>
						<DialogContent>
							<DialogHeader>
								<DialogTitle>Are you absolutely sure?</DialogTitle>
								<DialogDescription>
									This action cannot be undone. It will permanently delete this image.
								</DialogDescription>
							</DialogHeader>
							<DialogFooter className="gap-2 sm:space-x-0">
								<DialogClose asChild>
									<Button variant="outline">Cancel</Button>
								</DialogClose>
								<Button
									aria-label="Delete image"
									variant="destructive"
									onClick={handleDelete}
									disabled={isPending}
								>
									{isPending && (
										<svg
											className="mr-2 h-4 w-4 animate-spin"
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
				</div>
		</>
	);
}

export default ImageWithDeleteButton;