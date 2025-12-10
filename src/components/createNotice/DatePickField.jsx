"use client";
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Button } from "../ui/button";

/**
 * DatePickField Component
 * ------------------------
 * A reusable date picker field for creating notices.
 * Uses a Popover to display a Calendar component.
 * Selected date is stored locally and also updated in the notice context.
 */
const DatePickField = ({ setNoticeData, noticeData }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6">
      {/* Field Label */}
      <Label htmlFor="date">
        <span className="text-danger">*</span> Publish Date
      </Label>

      {/* Popover wrapping the date picker */}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"none"}
            id="date"
            className="w-full border-[0.5px] border-steel-blue text-sm rounded-sm h-11 mt-2 py-2.5 px-4 flex items-center justify-between"
          >
            {noticeData?.publish_date ? (
              <span className="text-dark-navy">
                {noticeData?.publish_date.toLocaleDateString()}{" "}
              </span>
            ) : (
              <span className="text-steel-blue">Select publishing date</span>
            )}
            <ChevronDownIcon className="text-steel-blue" />
          </Button>
        </PopoverTrigger>

        {/* Popover content with calendar */}
        <PopoverContent
          className="w-auto overflow-hidden p-0 bg-white border-[0.5px] border-steel-blue"
          align="start"
        >
          <Calendar
            mode="single"
            selected={noticeData.publish_date}
            captionLayout="dropdown"
            onSelect={(date) => {
              setOpen(false);
              setNoticeData((prev) => ({ ...prev, publish_date: date }));
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DatePickField;
