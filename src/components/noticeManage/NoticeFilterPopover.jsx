"use client";
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon, ListFilterPlus } from "lucide-react";
import Button from "../reusable/Button";
import { PopoverClose } from "@radix-ui/react-popover";
import MultiSelectRaw from "../reusable/MultiSelectField";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Calendar } from "../ui/calendar";
import { useNotice } from "@/context/notice/NoticeContext";
import { resetFilter, setStatus } from "@/context/notice/noticeActions";

/**
 * NoticeFilter
 * ------------
 * Reusable filter dropdown for filtering notices by:
 * - Department
 * - Employee (ID/Name)
 * - Status
 * - Published Date
 */
const NoticeFilter = () => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { dispatch } = useNotice();

  // -----------------------
  // Handlers
  // -----------------------
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDateOpen(false);
  };

  const handleResetFilters = () => {
    dispatch(resetFilter())
  };

  return (
    <Popover>
      {/* Trigger Icon */}
      <PopoverTrigger asChild>
        <ListFilterPlus className="mt-1 text-dark-navy" />
      </PopoverTrigger>

      <PopoverContent
        className={"bg-dark-white border-[0.5px] border-steel-blue"}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium">Filter by:</h3>

          {/* Reset Button */}
          <PopoverClose asChild className=" focus:outline-none">
            <Button onClick={handleResetFilters} className="btn-outline">
              Reset Filter
            </Button>
          </PopoverClose>
        </div>

        {/* Filter Fields */}
        <div className="flex flex-col gap-2">
          {/* Department/Individual filter  */}
          <MultiSelectRaw
            options={[
              "Individual",
              "All Department",
              "Finance",
              "Sales Team",
              "Web Team",
              "Database Team",
              "Admin",
              "HR",
            ]}
            placeholder={"Departments or Individuals"}
          />

          {/* Employee Search Field */}
          <Input
            className={"h-11 placeholder:text-steel-blue placeholder:text-sm"}
            type={"text"}
            placeholder={"Employee id or name"}
          />

          {/* Status filter  */}
          <Select onValueChange={(v) => dispatch(setStatus(v))}>
            <SelectTrigger
              className={"border-steel-blue text-steel-blue w-full h-11!"}
            >
              <SelectValue placeholder="Status" />
            </SelectTrigger>

            <SelectContent
              className={"border-[0.5px] border-steel-blue bg-white"}
            >
              <SelectItem value={"published"}>Published</SelectItem>
              <SelectItem value={"draft"}>Draft</SelectItem>
              <SelectItem value={"unpublished"}>UnPublished</SelectItem>
            </SelectContent>
          </Select>

          {/* Publish Date Filter */}
          <Popover open={isDateOpen} onOpenChange={setIsDateOpen}>
            <PopoverTrigger asChild>
              <div className="w-full border-[0.5px] border-steel-blue text-sm rounded-sm h-11 mt-2 py-2.5 px-4 flex items-center justify-between">
                {selectedDate ? (
                  <span className="text-dark-navy">
                    {selectedDate.toLocaleDateString()}{" "}
                  </span>
                ) : (
                  <span className="text-steel-blue">Published on</span>
                )}
                <ChevronDownIcon className="text-steel-blue" />
              </div>
            </PopoverTrigger>
            <PopoverContent
              className={"bg-white border-[0.5px] border-steel-blue"}
            >
              <Calendar
                mode="single"
                selected={selectedDate}
                captionLayout="dropdown"
                onSelect={handleDateSelect}
              />
            </PopoverContent>
          </Popover>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default NoticeFilter;
