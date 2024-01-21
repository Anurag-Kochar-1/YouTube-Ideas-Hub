
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ourAxios } from "@/lib/axios";
import { FetchIdeasDataMeta, Idea } from "@/types/idea.type";




const getMyIdeas = async () => {
  const res = await ourAxios.get(`/api/idea/my`);
  return res.data;
};

export const useMyIdeasQuery = () => {
  return useQuery<Idea[]>({
    queryKey: [QUERY_KEYS.FETCH_MY_IDEAS],
    queryFn: () => getMyIdeas(),
    staleTime: Infinity,
    gcTime: Infinity
  });
};
