import React from "react";
import { Skeleton } from "../ui/skeleton";

export const IdeasListLoading = () => {
  return (
    <div className="w-full flex flex-col justify-center items-start gap-10">
      {Array(20)
        .fill(undefined)
        .map((_, idx) => (
          <Skeleton key={idx} className="h-20" />
        ))}
    </div>
  );
};
