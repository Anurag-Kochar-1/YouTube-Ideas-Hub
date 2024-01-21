"use client"
import React, { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useInvalidateQuery } from "@/hooks/use-invalidate-query";
import { QUERY_KEYS } from "@/constants/query-keys";

export const SearchBar = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
 
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
 
      return params.toString()
    },
    [searchParams]
  )
  // ============ STATES ============
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = () => {
    router.push(pathname + '?' + createQueryString('search', searchValue))

  };

  return (
    <Input
      className="w-full"
      value={searchValue}
      onChange={(e) => setSearchValue(e.target.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleSearch();
        }
      }}
    />
  );
};
