"use client";

import { api } from "@/lib/apis";
import { noticeSchema } from "@/schemas/notice.schema.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Default structure for a notice
 * -------------------------------
 * This object defines all the required and optional fields
 * for creating a notice. Used to reset the form state.
 */
const defaultNoticeData = {
  target_department: ["Individual"], // default department
  title: "",
  employee_id: "",
  employee_name: "",
  employee_position: "",
  type: "",
  publish_date: null,
  body: "",
};

/**
 * useCreateNotice Hook
 * --------------------
 * Provides state and handlers for creating a notice.
 * Manages:
 *  - Form data (noticeData)
 *  - Form errors
 *  - File attachments
 *  - Loading state
 *  - Department multi-select
 *  - Publishing the notice via API
 */
export const useCreateNotice = () => {
  const [noticeData, setNoticeData] = useState(defaultNoticeData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [files, setFiles] = useState([]);
  const router = useRouter();

  /**
   * departmentSelectToggle
   * ----------------------
   * Adds or removes a department from the target_department array.
   * Used to handle multi-select for departments.
   */
  const departmentSelectToggle = (item) => {
    setNoticeData((prev) => {
      const targetDepartments = noticeData?.target_department || [];
      const isIncluded = targetDepartments?.includes(item);
      return {
        ...prev,
        target_department: isIncluded
          ? targetDepartments?.filter((i) => i !== item)
          : [...targetDepartments, item],
      };
    });
  };

  /**
   * handleOnChange
   * ----------------
   * Generic input handler for form fields.
   * Updates the noticeData state dynamically based on input name.
   */
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNoticeData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * attachesUpload
   * ----------------
   * Handles uploading attached files to the server.
   * Uses FormData to send files via API.
   * Returns API response (success, message, and uploaded file URLs).
   */
  const attachesUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("attaches", file));

    const res = await api.uploadAttaches(formData);    
    return res;
  };

  /**
   * handlePublish
   * ----------------
   * Validates notice form, uploads attachments, and calls the API to create a notice.
   * Handles:
   *  - Form validation with Zod
   *  - Error display for invalid data
   *  - File attachment upload
   *  - API request and response handling
   *  - Success toast & redirect
   *  - Reset form state
   */
  const handlePublish = async () => {
    setIsLoading(true);
    setError(null); // clear previous errors

    try {
      // 1. Validate the form using Zod
      const validate = noticeSchema.safeParse(noticeData);

      if (!validate.success) {
        // Show only 1 error instead of multiple Zod errors
        setError("Please fill all required field with proper value.");
        return;
      }

      let newNotice = validate.data;

      // 2. Upload attachments if any
      if (files.length > 0) {
        const res = await attachesUpload();
        if (!res?.success) {
          toast.error(res?.message || "Attachments cann't upload");
          return;
        }
        const attaches = res?.attaches?.map((attach) => attach.url);
        newNotice = { ...validate.data, attaches: [...attaches] };
      }

      // 3. Send API request to create notice
      const res = await api.createNotice(newNotice);
      if (!res.success) {
        return toast.error(res?.message);
      }

      // 4. Success handling
      toast.success(res?.message || "New Notice Created Successfully");

      // 5. Reset form state
      setNoticeData(defaultNoticeData);
      setError(null);

      // 6. Redirect to notices list
      router.push("/notices");
    } catch (err) {
      // Catch network/server errors
      toast.error(err?.message || "Couldn't Create the Notice");
    } finally {
      // 5. Stop loader
      setIsLoading(false);
    }
  };

  return {
    noticeData,
    error,
    setNoticeData,
    departmentSelectToggle,
    handleOnChange,
    handlePublish,
    isLoading,
    setIsLoading,
    files,
    setFiles,
  };
};
