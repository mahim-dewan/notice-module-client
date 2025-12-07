"use client";

import React, { useState } from "react";
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

// Mock notice data (replace with API response later)
const notices = [
  {
    _id: "1",
    checked: true,
    title: "Office closed on Friday for maintenance",
    type: "General / Company-Wide",
    department: "All Department",
    publishedOn: "15-Jun-2025",
    status: "Published",
  },
  {
    _id: "2",
    checked: true,
    title: "New Performance Review Policy Released",
    type: "Performance Improvement",
    department: "Sales Team",
    publishedOn: "10-Jun-2025",
    status: "Unpublished",
  },
  {
    _id: "3",
    checked: false,
    title: "Team Lunch Scheduled for Friday",
    type: "Appreciation / Recognition",
    department: "Web Team",
    publishedOn: "12-Jun-2025",
    status: "Draft",
  },
  {
    _id: "4",
    checked: true,
    title: "Mandatory Cybersecurity Training",
    type: "Advisory / Personal Reminder",
    department: "Database",
    publishedOn: "14-Jun-2025",
    status: "Published",
  },
  {
    _id: "5",
    checked: false,
    title: "Salary Adjustment Notification",
    type: "Payroll / Compensation",
    department: "Finance",
    publishedOn: "11-Jun-2025",
    status: "Draft",
  },
  {
    _id: "6",
    checked: true,
    title: "Contract Renewal Reminder",
    type: "Contract / Role Update",
    department: "HR",
    publishedOn: "13-Jun-2025",
    status: "Published",
  },
  {
    _id: "7",
    checked: true,
    title: "Contract Renewal Reminder",
    type: "Contract / Role Update",
    department: "Individual",
    publishedOn: "13-Jun-2025",
    status: "Published",
  },
];

const NoticeTable = () => {
  const [published, setPublished] = useState(true);
  const [unPublished, setUnpublished] = useState(false);

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
    return status === "Published"
      ? "bg-success/20 text-success"
      : status === "Draft"
      ? "bg-amber/20 text-amber"
      : status === "Unpublished"
      ? "bg-dark-white text-dark-navy"
      : "";
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-8">
      <div className="overflow-x-auto rounded-xl border border-accent relative">
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
            {notices.map((notice) => (
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
                  <span className={getDepartmentColorClass(notice.department)}>
                    {notice.department}
                  </span>
                </TableCell>

                {/* Publish Date */}
                <TableCell className="hidden xl:table-cell">
                  {notice.publishedOn}
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
            onToggle={setPublished}
            containerClass={"fixed top-[323px]  right-[50px]"}
          />

          <ToggleSwitch
            label={"Unpublished"}
            isEnabled={unPublished}
            onToggle={setUnpublished}
            containerClass={"fixed top-[546px] right-[50px]"}
          />
        </div>
      </div>
    </div>
  );
};

export default NoticeTable;
