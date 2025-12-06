"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";
import { X } from "lucide-react";

/**
 * UploadAttach Component
 * ----------------------
 * Allows users to upload multiple files as attachments.
 * - Displays selected files with a removable option
 */
const UploadAttach = () => {
  const [files, setFiles] = useState([]);

  // Remove a selected file
  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Add a new file to the list
  const handleFileChange = (e) => {
    const newFile = e.target.files[0];
    if (newFile) setFiles((prev) => [...prev, newFile]);
  };

  return (
    <div className="mt-6">
      {/* Title / instruction */}
      <span className={" text-sm text-dark-navy"}>
        Upload Attachments (optional)
      </span>

      {/* Upload box */}
      <Label
        htmlFor="attach"
        className={
          "border border-dotted border-success w-full h-32 rounded-xl mt-2"
        }
      >
        <div className="w-[331px] h-[90px] mx-auto flex flex-col gap-2 items-center justify-center">
          <Image
            alt="icon"
            src={"/upload-icon.png"}
            width={1000}
            height={1000}
            className="w-10 h-10"
          />
          <p>
            <span className="text-success font-bold">Upload</span> nominee
            profile image or drag and drop.
          </p>
          <p className="text-gray-blue"> Accepted File Type: jpg, png</p>
        </div>
      </Label>

      {/* Hidden file input */}
      <Input
        id={"attach"}
        type={"file"}
        className={"hidden"}
        onChange={handleFileChange}
      />

      {/* Display selected files */}
      <div className="mt-6 flex items-center gap-4 flex-wrap">
        {files?.map((file, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-dark-white w-fit px-4 py-2 rounded-[48px]"
          >
            <span>{file?.name}</span>
            <X
              size={20}
              className="text-danger bg-white rounded-full"
              onClick={() => handleRemoveFile(i)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadAttach;
