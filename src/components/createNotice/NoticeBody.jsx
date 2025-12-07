import React from "react";
import { Label } from "../ui/label";
import { useCreateNotice } from "@/hooks/useCreateNotice";

const NoticeBody = () => {
  const { noticeData, setNoticeData } = useCreateNotice();
  return (
    <div className="mt-6">
      <Label className={"text-sm text-dark-navy"}>Notice Body</Label>
      <textarea
        value={noticeData.body}
        onChange={(e) =>
          setNoticeData((prev) => ({ ...prev, body: e.target.value }))
        }
        className="border-[0.5px] w-full h-[108px] border-steel-blue text-sm rounded-sm mt-2 focus:outline-none py-2.5 px-4"
        placeholder="Write the details about notice"
      ></textarea>
    </div>
  );
};

export default NoticeBody;
