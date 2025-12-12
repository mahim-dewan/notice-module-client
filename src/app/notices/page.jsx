import Notices from "@/components/noticeManage/Notices";
import NoticeProvider from "@/context/notice/NoticeContext";
import React, { Suspense } from "react";

const Page = () => {
  return (
    <Suspense
      fallback={
        <p className="w-full h-screen flex items-center justify-center">
          Loading...
        </p>
      }
    >
      <NoticeProvider>
        <Notices />
      </NoticeProvider>
    </Suspense>
  );
};

export default Page;
