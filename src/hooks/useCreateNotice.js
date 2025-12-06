"use client";

import { useState } from "react";

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
  publish_date: "",
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
   * Placeholder for publishing the notice.
   * Currently logs the noticeData; later can call API.
   */
  const handlePublish = async () => {
    console.log(noticeData);
  };

  return {
    noticeData,
    setNoticeData,
    departmentSelectToggle,
    handleOnChange,
    handlePublish,
  };
};
