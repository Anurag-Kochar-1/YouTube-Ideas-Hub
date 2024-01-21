"use client";
import IdeaCard from "@/components/idea-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useMyIdeasQuery } from "@/hooks/use-my-ideas-query";
import React from "react";

const Page = () => {
  const { data: ideas, isLoading } = useMyIdeasQuery();
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start gap-10 p-1 pt-20 max-w-7xl mx-auto">
      {isLoading ? (
        <>
          {Array(10)
            ?.fill(undefined)
            .map((_, idx) => (
              <Skeleton key={idx} className="h-40" />
            ))}
        </>
      ) : null}

      {ideas ? (
        ideas?.map((idea) => <IdeaCard key={idea.id} idea={idea} />)
      ) : (
        <span> No Ideas </span>
      )}
    </div>
  );
};

export default Page;
