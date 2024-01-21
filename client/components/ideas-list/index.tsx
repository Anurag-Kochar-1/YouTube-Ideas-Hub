"use client";
import { useIdeasQuery } from "@/hooks/use-ideas-query";
import React, { useEffect } from "react";
import { IdeasListLoading } from "./loading";
import IdeaCard from "../idea-card";
import { FetchIdeasDataMeta, Idea } from "@/types/idea.type";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { useInView } from "react-intersection-observer";
import { ourAxios } from "@/lib/axios";

export const IdeasList = () => {
  const { ref: loadMoreIdeasRef, inView } = useInView();
  const {
    status,
    data,
    isLoading,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
    refetch,
    isPending,
    fetchStatus,
    isRefetching,
  } = useInfiniteQuery<any>({
    queryKey: [QUERY_KEYS.FETCH_IDEAS],
    queryFn: async ({ pageParam }) => {
      const res = await ourAxios.get(`/api/idea?limit=10&page=${pageParam}`);
      // await new Promise((re) => setTimeout(re, 2000))
      return res.data.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam: any) => {
      if (lastPage && lastPage?.length === 0) {
        return 1;
      }
      return lastPageParam + 1;
    },
    getPreviousPageParam: (firstPage, allPages, firstPageParam: any) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading) return <IdeasListLoading />;
  return (
    <div className="flex flex-col w-full justify-center items-start gap-10">
      <div className="w-full h-32 bg-black"></div>
      <div className="flex flex-col w-full justify-center items-start gap-6">
        {status === "success" ? (
          <>
            {data.pages?.length > 0 ? (
              data.pages.map((page, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex w-full flex-col items-start justify-start"
                >
                  {page &&
                    page.map((idea: Idea) => (
                      <IdeaCard key={idea.id} idea={idea} className="mb-5" />
                    ))}
                </div>
              ))
            ) : (
              <span> data.pages?.length is 0 </span>
            )}
          </>
        ) : null}

        <div
          ref={loadMoreIdeasRef}
          className="flex w-full flex-col items-center justify-center  py-20"
        >
          {isFetchingNextPage ? (
            <Loader2 className="animate-spin bg-secondary" size={30} />
          ) : hasNextPage && data?.pages[0]?.length !== 0 ? (
            <div className="flex w-full items-center justify-center">
              <Button
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
                className="mx-auto"
              >
                Load more
              </Button>
            </div>
          ) : (
            <div className="w-full text-center">
              <span className="mx-auto font-secondary text-sm font-bold">
                {" "}
                {data?.pages[0]?.length === 0
                  ? "Jobs not found"
                  : "End of the list 🙂"}{" "}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
