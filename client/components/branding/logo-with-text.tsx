import Link from "next/link";
import React from "react";

const LogoWithText = ({ className }: { className?: string }) => {
  return (
    <Link href={`/`}>
      <div className="flex justify-center items-center gap-1 truncate line-clamp-1">
        💡
        <div className="text-foreground font-semibold">
          <span className="text-red-600 font-bold">YoutTube</span> Ideas Hub{" "}
        </div>
      </div>
    </Link>
  );
};

export default LogoWithText;
