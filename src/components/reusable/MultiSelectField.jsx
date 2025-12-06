"use client";

import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

/**
 * Reusable MultiSelectRaw Component
 * ------------------------
 * A custom multi-select dropdown component built using Popover.
 * - Supports selecting multiple items via checkboxes.
 * - Closes automatically when clicking outside.
 * - Dynamically adjusts dropdown width to match trigger button.
 *
 * Props:
 *  - options: array of string options to display
 *  - placeholder: string placeholder when no item is selected
 *  - selected: array of currently selected options
 *  - toggle: function to add/remove items from selection
 */
export default function MultiSelectRaw({options,placeholder,toggle,selected,}) {
  // Dropdown open state
  const [open, setOpen] = useState(false);
  // Dropdown content ref
  const dropdownRef = useRef(null);
  // Trigger button ref
  const triggerRef = useRef(null);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* Trigger Button */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOpen(!open)}
            className="w-full h-11 border-[0.5px] border-steel-blue mt-2 text-gray-blue rounded-sm px-4 py-2.5 text-left flex justify-between items-center"
          >
            <span className="text-sm">
              {selected?.length ? (
                <span className="text-sky-blue">{selected.join(", ")} </span>
              ) : (
                placeholder
              )}
            </span>
            <ChevronDown className="text-gray-blue" size={16} />
          </button>
        </PopoverTrigger>
        
        {/* Dropdown Content */}
        <PopoverContent
          ref={dropdownRef}
          className={"bg-white border-[0.5px] border-gray-300 rounded-md"}
          style={{ width: triggerRef.current?.offsetWidth }}
        >
          {options.map((item) => (
            <Label
              key={item}
              className="flex items-center gap-2 cursor-pointer text-sm hover:bg-dark-white hover:rounded-md p-2"
            >
              <Input
                type="checkbox"
                checked={selected?.includes(item)}
                onChange={() => toggle(item)}
                className="w-6 h-6"
              />
              {item}
            </Label>
          ))}
        </PopoverContent>
      </Popover>
    </div>
  );
}
