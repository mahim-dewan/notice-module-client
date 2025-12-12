"use client";
import React, { useState } from "react";
import MultiSelectRaw from "../reusable/MultiSelectField";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CalendarDays } from "lucide-react";
import { Calendar } from "../ui/calendar";
import Button from "../reusable/Button";
import { resetFilter, setStatus } from "@/context/notice/noticeActions";
import { useNotice } from "@/context/notice/NoticeContext";

/**
 * NoticeFilterBar
 * ----------------
 * Horizontal filter bar used to filter notices
 * by department, employee, status and publish date.
 */
const NoticeFilterBar = () => {
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const { dispatch } = useNotice();

  // -----------------------
  // Handlers
  // -----------------------

  // Handle calendar date selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsDateOpen(false);
  };

  // Reset all active filters
  const handleResetFilters = () => {
    dispatch(resetFilter());
  };

  return (
    <div>
      <div className="flex items-center gap-4 justify-end flex-wrap pr-[17px] mt-10">
        {/* Filter Label */}
        <h3 className="text-sm font-medium">Filter by:</h3>

        {/* Department/Individual filter  */}
        <div className="-mt-2">
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
        </div>

        {/* Employee Search Field */}
        <Input
          className={
            "h-11 w-[173px]! placeholder:text-steel-blue placeholder:text-sm"
          }
          type={"text"}
          placeholder={"Employee id or name"}
        />

        {/* Status filter  */}
        <Select onValueChange={(v) => dispatch(setStatus(v))}>
          <SelectTrigger className={"border-steel-blue text-steel-blue h-11!"}>
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
            <div className="border-[0.5px] border-steel-blue text-sm rounded-sm h-11 py-2.5 px-4 flex items-center justify-between gap-2.5">
              {selectedDate ? (
                <span className="text-dark-navy">
                  {selectedDate.toLocaleDateString()}
                </span>
              ) : (
                <span className="text-steel-blue">Published on</span>
              )}
              <CalendarDays className="text-steel-blue" />
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

        {/* Filter Reset Button  */}
        <Button onClick={handleResetFilters} className="btn-outline">
          Reset Filter
        </Button>
      </div>
    </div>
  );
};

export default NoticeFilterBar;
