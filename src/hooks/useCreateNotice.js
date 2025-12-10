"use client";

import { api } from "@/lib/apis";
import { noticeSchema } from "@/schemas/notice.schema.js";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

/**
 * Default structure for a notice
 */
const defaultNoticeData = {
  target_department: ["Individual"],
  title: "",
  employee_id: "",
  employee_name: "",
  employee_position: "",
  type: "",
  publish_date: null,
  body: "",
  attaches: [],
};

/**
 * useCreateNotice Hook
 * --------------------
 * Provides state and handlers for creating a notice.
 * Manages controlled form state, multi-select departments,
 * input changes, and publishing action.
 */
export const useCreateNotice = () => {
  const [noticeData, setNoticeData] = useState(defaultNoticeData);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  /**
   * departmentSelectToggle
   * ----------------------
   * Adds or removes a department from the target_department array.
   * Ensures multi-select functionality for department selection.
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
   * Handles input changes for all form fields dynamically.
   * Updates the corresponding key in noticeData state.
   */
  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNoticeData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * handlePublish
   * ----------------
   * Validates the form data, sends create notice request,
   * handles success/error states, and resets the form.
   */
  const handlePublish = async () => {
    setIsLoading(true);
    setError(null); // clear previous errors early

    try {
      // 1. Validate the form using Zod
      const validate = noticeSchema.safeParse(noticeData);

      if (!validate.success) {
        // Show only 1 error instead of multiple Zod errors
        setError("Please fill all required field with proper value.");
        return;
      }

      // 2. API request to backend
      const res = await api.createNotice(validate.data);
      if (!res.success) {
        return toast.error(res?.message);
      }

      // 3. Success handling
      toast.success(res?.message || "New Notice Created Successfully");

      // Reset form values
      setNoticeData(defaultNoticeData);
      setError(null);

      // Redirect to notices page
      router.push("/notices");
    } catch (err) {
      // 4. Catch network/server errors
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
  };
};
