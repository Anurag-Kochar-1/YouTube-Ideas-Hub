"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useIdeaCategoriesQuery } from "@/hooks/use-idea-categories-query";
import { Button } from "../ui/button";
import Link from "next/link";
import { Skeleton } from "../ui/skeleton";

export const Filters = () => {
  const { data: categories, isLoading } = useIdeaCategoriesQuery();
  const searchParams = useSearchParams();
  const categoryType = searchParams.get("category");


  if (isLoading)
    return (
      <div className="w-full mx-auto gap-4 flex justify-center items-center">
        {Array(5)
          .fill(undefined)
          .map((_, idx) => {
            return <Skeleton key={idx} className="h-11 rounded-md px-8 w-32"> </Skeleton>;
          })}
      </div>
    );

  return (
    <div className="w-full mx-auto gap-4 flex justify-center items-center flex-wrap lg:flex-nowrap">
      <Link href={`/`}>
        <Button variant={!categoryType ? "default" : "outline"} size={'lg'}>
          Trending
        </Button>
      </Link>
      {categories?.slice(0, 6)?.map((category) => {
        return (
          <Link href={`/?category=${category.name}`} key={category.id}>
            <Button
              variant={categoryType === category.name ? "default" : "outline"}
              size={'lg'}
            >
              {category.name}
            </Button>
          </Link>
        );
      })}
    </div>
  );
};
