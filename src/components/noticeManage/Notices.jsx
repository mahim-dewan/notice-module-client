"use client";
import NoticeFilterBar from "@/components/noticeManage/NoticeFilterBar";
import NoticeFilter from "@/components/noticeManage/NoticeFilterPopover";
import NoticeTable from "@/components/noticeManage/NoticeTable";
import Button from "@/components/reusable/Button";
import PaginationBox from "@/components/reusable/PaginationBox";
import { useNotice } from "@/context/notice/NoticeContext";
import { Plus } from "lucide-react";
import Link from "next/link";

/**
 * Notices Page
 * -------------
 * Main dashboard page for managing notices.
 * Shows:
 * - Header with active/draft counts
 * - Create notice actions
 * - Mobile + desktop filters
 * - Notices table
 */
const Notices = () => {
  const { state } = useNotice();
  const { noticeData } = state;

  return (
    <div>
      {/* ================= HEADER SECTION ================= */}
      <div className="mt-6 pr-6 pl-[22px] flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* ---------- Left Content (Title + Stats) ---------- */}
        <div className="w-full lg:w-fit flex items-start justify-between">
          <div className="flex flex-col self-start lg:self-center gap-2">
            <h1 className="font-medium text-xl text-dark-navy">
              Notice Management
            </h1>

            {/* Notice Statistics */}
            <div className="flex items-center gap-4">
              <p className="pr-4 border-r-[1.5px] border-gray text-success">
                Active Notices: {noticeData?.activeNotices}
              </p>
              <p className="text-golden-orange">
                Draft Notice: {noticeData?.draftNotices}
              </p>
            </div>
          </div>

          {/* Mobile Filter Icon */}
          <div className="lg:hidden">
            <NoticeFilter />
          </div>
        </div>

        {/* ---------- Right Content (Actions) ---------- */}
        <div className="flex items-center gap-4">
          <Link
            href={"/notices/create"}
            className="flex items-center gap-2.5 text-white btn-danger"
          >
            <Plus />
            Create Notice
          </Link>
          <Button className="flex items-center gap-2.5 text-golden-orange btn-outline-amber border-golden-orange">
            <img src={"/edit.png"} />
            All Draft Notice
          </Button>
        </div>
      </div>

      {/* ================= FILTER SECTION ================= */}

      {/* Desktop Filter Bar */}
      <div className="hidden lg:block">
        <NoticeFilterBar />
      </div>

      {/* ================= TABLE SECTION ================= */}
      <NoticeTable />

      {/* ================= PAGINATION BOX ================= */}
      {noticeData?.totalPages > 1 && <PaginationBox />}
    </div>
  );
};

export default Notices;
