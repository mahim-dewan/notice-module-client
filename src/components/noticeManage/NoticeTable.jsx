"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "../ui/input";
import { EllipsisVertical, Eye, SquarePen } from "lucide-react";
import ToggleSwitch from "../reusable/ToggleSwitch";
import NoticeSkelator from "./NoticeSkelator";

const NoticeTable = ({
  notices,
  isLoading,
  error,
  published,
  unPublished,
  statusToggle,
}) => {
  // -------------------------
  // Helpers
  // -------------------------
  // Map department name to color class
  const getDepartmentColorClass = (department) => {
    return (
      (department === "All Department" && "text-indigo") ||
      (department === "Finance" && "text-success") ||
      (department === "Sales Team" && "text-amber") ||
      (department === "Web Team" && "text-primary") ||
      (department === "HR" && "text-red-500") ||
      (department === "Individual" && "text-sky-blue") ||
      (department === "Admin" && "text-purple") ||
      "text-dark-navy"
    );
  };

  // Map notice status to badge style
  const getStatusBadgeClass = (status) => {
    return status === "published"
      ? "bg-success/20 text-success"
      : status === "draft"
      ? "bg-amber/20 text-amber"
      : status === "unpublished"
      ? "bg-dark-white text-dark-navy"
      : "";
  };

  // ========================================
  // Loading Skelaton and Error Message
  // ========================================
  if (isLoading) return <NoticeSkelator />;
  if (error)
    return (
      <p className="text-2xl flex items-center justify-center min-h-[50vh] text-danger">
        {error}
      </p>
    );

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-8 relative">
      <div className="overflow-x-auto rounded-xl border border-accent ">
        {/* ---------- Table ---------- */}
        <Table className="min-w-full divide-y divide-accent ">
          <TableHeader>
            <TableRow className="text-base font-medium border-accent">
              {/* Select All Checkbox */}
              <TableHead className="w-8">
                <Input type="checkbox" className="w-5 h-5" />
              </TableHead>

              {/* Title */}
              <TableHead className="py-2 text-left">Title</TableHead>

              {/* Notice Type */}
              <TableHead className="py-2 text-left  hidden md:table-cell">
                Notice Type
              </TableHead>

              {/* Department */}
              <TableHead className="py-2 text-left  hidden lg:table-cell">
                Departments/Individual
              </TableHead>

              {/* Published Date */}
              <TableHead className="py-2 text-left  hidden xl:table-cell">
                Published On
              </TableHead>

              {/* Status */}
              <TableHead className="py-2 text-left ">Status</TableHead>

              {/* Actions */}
              <TableHead className="py-2 text-center hidden xl:table-cell">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>

          {/* ---------- Rows ---------- */}
          <TableBody>
            {notices?.map((notice) => (
              <TableRow
                key={notice._id}
                className="bg-white border-b border-accent"
              >
                {/* Row Checkbox */}
                <TableCell className="font-medium">
                  <Input type="checkbox" className="w-5 h-5" />
                </TableCell>

                {/* Title */}
                <TableCell className="font-medium truncate max-w-[150px] ">
                  {notice.title}
                </TableCell>

                {/* Type */}
                <TableCell className="hidden md:table-cell">
                  {notice.type}
                </TableCell>

                {/* Department */}
                <TableCell className="hidden lg:table-cell">
                  <span
                    className={getDepartmentColorClass(
                      notice.target_department[0]
                    )}
                  >
                    {notice.target_department[0]}
                  </span>
                </TableCell>

                {/* Publish Date */}
                <TableCell className="hidden xl:table-cell">
                  {new Date(notice.publish_date).toDateString()}
                </TableCell>

                {/* Status Badge */}
                <TableCell className="h-[72px]">
                  <span
                    className={`font-medium py-0.5 px-3 rounded-sm 
                      ${getStatusBadgeClass(notice.status)}`}
                  >
                    {notice.status}
                  </span>
                </TableCell>

                {/* Mobile Actions */}
                <TableCell className={"xl:hidden"}>
                  <EllipsisVertical className="text-right ml-auto" />
                </TableCell>

                {/* Desktop Actions */}
                <TableCell
                  className={
                    "hidden xl:flex items-center justify-end gap-4 text-gray-blue h-[72px]"
                  }
                >
                  <Eye className="cursor-pointer hover:text-dark-navy" />
                  <SquarePen className="cursor-pointer hover:text-dark-navy" />
                  <EllipsisVertical className="cursor-pointer hover:text-dark-navy" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* ---------- Sidebar Filters ---------- */}
        <div className="hidden lg:block">
          <ToggleSwitch
            label={"Published"}
            isEnabled={published}
            onToggle={() => statusToggle("published")}
            containerClass={" fixed top-[323px]  right-[50px]"}
          />

          <ToggleSwitch
            label={"Unpublished"}
            isEnabled={unPublished}
            onToggle={() => statusToggle("unpublished")}
            containerClass={"fixed top-[546px] right-[50px]"}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeTable;
