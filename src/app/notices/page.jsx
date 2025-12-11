import Notices from "@/components/noticeManage/Notices";
import React, { Suspense } from "react";

const Page = () => {
  return <Suspense fallback={<p className="w-full h-screen flex items-center justify-center">Loading...</p>}>
    <Notices/>
  </Suspense>;
};

export default Page;
