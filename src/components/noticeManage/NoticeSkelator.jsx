import React from "react";
import { Skeleton } from "../ui/skeleton";

const NoticeSkelator = () => {
  return (
    <div className="p-5">
      <Skeleton className="h-12 w-full mb-4" />
      <div className="flex flex-col gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div className="flex items-center space-x-4 w-full" key={i}>
            <Skeleton
              className={`h-12 ${i % 2 === 0 ? "w-4/12" : "w-8/12"} lg:w-2/12`}
            />
            <Skeleton
              className={`h-12 ${i % 2 === 0 ? "w-8/12" : "w-4/12"} lg:w-4/12`}
            />
            <Skeleton className="h-12 w-3/12 hidden lg:block" />
            <Skeleton className="h-12 w-2/12 hidden lg:block" />
            <Skeleton className="h-12 w-1/12 hidden lg:block" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeSkelator;
