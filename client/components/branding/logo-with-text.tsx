import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const LogoWithText = ({ className }: { className?: string }) => {
  return (
      <Link href={`/`} className={cn("flex justify-center items-center gap-1 truncate line-clamp-1", className)}>
        💡
        <div className="text-foreground font-semibold line-clamp-1 truncate">
          <span className="text-red-600 font-bold">YoutTube</span> Ideas Hub{" "}
        </div>
      </Link>
  );
};

export default LogoWithText;
