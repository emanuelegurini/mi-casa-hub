"use client";
import { createClient } from "@/utils/supabase/client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

interface PropertyPageProps {
  params: {
    id: string;
  };
}

function PropertyPage({ params }: PropertyPageProps) {
  const { id } = params;

  const [value, setValue] = useState("");

  const handleUpdate = async () => {
    const { data, error } = await createClient()
      .from("properties")
      .update({
        description: value,
      })
      .eq("id", "14e92db1-aeef-47b0-81d6-2f787de27d28")
      .select()
      .single()
      .throwOnError();

    if (error) {
      console.log(error.message);
    }

    console.log("L'operazione è andata a buon fine:", data);
  };

  return (
    <>
      <div>Property id: {id}</div>
      <ReactQuill theme="snow" value={value} onChange={setValue} />
      <div>{value}</div>
      <button onClick={handleUpdate}>Update</button>
    </>
  );
}

export default PropertyPage;
