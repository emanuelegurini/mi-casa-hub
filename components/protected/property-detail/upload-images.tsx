"use client";

import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/client";
import { Loader2 as SpinnerIcon } from "lucide-react";

const UploadImages: React.FC<{ id: string }> = (props) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isPending, startTransition] = useTransition();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setSelectedFiles(files);
    setSuccessMessage(null); // Reset success message on new file selection
  };

  const handleUpload = () => {
    startTransition(async () => {
      if (selectedFiles.length === 0) {
        console.log("No files selected");
        return;
      }

      let allUploadsSuccessful = true;

      for (const file of selectedFiles) {
        const {
          data: { user },
        } = await createClient().auth.getUser();
        const { data, error } = await createClient()
          .storage.from("gallery-image")
          .upload(`${user?.id}/${props.id}/${file.name}`, file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (error) {
          console.log(error.message);
          allUploadsSuccessful = false;
          setSelectedFiles([]);
        } else {
          console.log("File uploaded successfully:", data);
        }
      }

      if (allUploadsSuccessful) {
        setSuccessMessage("All files uploaded successfully!");
      }
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Images
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {selectedFiles.length > 0 && (
              <button
                onClick={handleUpload}
                className="mt-4 px-4 py-2 bg-slate-800 text-white rounded"
                disabled={isPending}
              >
                {isPending ? (
                  <SpinnerIcon className="h-6 w-6 animate-spin" />
                ) : (
                  "Upload"
                )}
              </button>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default UploadImages;
