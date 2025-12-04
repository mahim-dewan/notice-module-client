"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Sidebar menu configuration
const menuItems = [
  {
    id: 1,
    path: "/",
    label: "Dashboard",
    icon: "/menuIcons/dashboard.png",
  },
  {
    id: 2,
    path: "/employee",
    label: "Employee",
    icon: "/menuIcons/employee.png",
  },
  { id: 3, path: "/payroll", label: "Payroll", icon: "/menuIcons/payroll.png" },
  {
    id: 4,
    path: "/pay-slip",
    label: "Pay Slip",
    icon: "/menuIcons/pay-slip.png",
  },
  {
    id: 5,
    path: "/attendance",
    label: "Attendance",
    icon: "/menuIcons/attendance.png",
  },
  {
    id: 6,
    path: "/request-center",
    label: "Request Center",
    icon: "/menuIcons/request-center.png",
  },
  {
    id: 7,
    path: "/career-database",
    label: "Career Database",
    icon: "/menuIcons/career-database.png",
    subMenus: [
      {
        id: 1,
        path: "/payroll",
        label: "Payroll",
        icon: "/menuIcons/payroll.png",
      },
    ],
  },
  {
    id: 8,
    path: "/document-manager",
    label: "Document Manager",
    icon: "/menuIcons/document-manager.png",
  },
  {
    id: 9,
    path: "/notices",
    label: "Notice Board",
    icon: "/menuIcons/notice-board.png",
  },
  {
    id: 10,
    path: "/activity-log",
    label: "Activity Log",
    icon: "/menuIcons/activity-log.png",
  },
  {
    id: 11,
    path: "/exit-interview",
    label: "Exit Interview",
    icon: "/menuIcons/exit-interview.png",
  },
  {
    id: 12,
    path: "/profile",
    label: "Profile",
    icon: "/menuIcons/profile.png",
  },
];

const Slidebar = () => {
  // Get current route for active menu styling
  const pathname = usePathname();

  return (
    <Sheet>
      {/* Hamburger menu trigger */}
      <SheetTrigger>
        <Menu />
      </SheetTrigger>

      {/* Sidebar content */}
      <SheetContent
        className={"bg-white w-[257px] border-r border-accent gap-0"}
        side="left"
      >
        <SheetHeader>
          <SheetTitle>
            <Link href={"/"}>
              <img alt="Logo" src="/Logo.png" className="w-30" />
            </Link>
          </SheetTitle>
        </SheetHeader>

        {/* Menu items */}
        <nav className="p-4 flex flex-col gap-3.5 overflow-y-auto">
          {menuItems.map((item) => {
            // Check active route
            const isActive = pathname === item?.path;

            return (
              <SheetClose asChild key={item?.id}>
                <Link
                  href={item?.path}
                  className={`flex items-center gap-4 px-4 py-3 rounded-md text-sm font-normal ${
                    isActive && "bg-dark-white border-r border-danger"
                  } `}
                >
                  {/* Icon */}
                  <span>
                    <img alt="icon" src={item?.icon} className="w-5 h-5" />
                  </span>

                  {/* Label */}
                  <span>{item?.label}</span>
                </Link>
              </SheetClose>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default Slidebar;
