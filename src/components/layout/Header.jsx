import React from "react";
import Slidebar from "./Slidebar";
import { getGreetingWithDate } from "@/utils/greeting";

const Header = () => {
  // Get dynamic greeting and formatted date
  const { greeting, date } = getGreetingWithDate();

  return (
    <header className="flex items-center gap-2 py-4 px-2 lg:p-0 border-b border-dark-white bg-white w-full">
      {/* Mobile Header (Sidebar + Logo) */}
      <div className="flex items-center gap-2 lg:hidden">
        <Slidebar />
        <img alt="Logo" src="/Logo.png" className="w-30" />
      </div>

      {/* Desktop Greeting Section */}
      <div className="hidden lg:block px-10 py-[17px]">
        <p className="font-medium text-base">{greeting} Asif</p>
        <p className="font-normal text-sm text-dark-navy">{date}</p>
      </div>

      {/* Right Side (Notifications + Profile) */}
      <div className="flex items-center ml-auto gap-[18px] lg:px-8 lg:py-4">
        {/* Notification Icon */}
        <img
          alt="icon"
          src="/notification-icon.png"
          className="border-r border-gray-blue pr-3"
        />

        {/* User Info */}
        <div className="flex items-center gap-2">
          <div className="flex flex-col items-center">
            <h3 className="font-medium! text-base">Asif Riaz</h3>
            <p className="self-end text-sm">HR</p>
          </div>

          {/* Profile Image */}
          <img
            alt="Profile"
            src="/profile.png"
            className="w-10 h-10 rounded-full"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
