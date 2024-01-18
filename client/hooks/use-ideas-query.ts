import { QUERY_KEYS } from "@/constants/query-keys";
import { ourAxios } from "@/lib/axios";
import { FetchIdeasDataMeta, Idea } from "@/types/idea.type";
import { useQuery } from "@tanstack/react-query";


type useQueryType = {
  data: Idea[]
  meta: FetchIdeasDataMeta
}

const getIdeas = async () => {
  const res = await ourAxios.get(`/api/idea?limit=50`);
  // await new Promise((re) => setTimeout(re, 2000))
  return res.data;
};

export const useIdeasQuery = () => {
  return useQuery<useQueryType>({
    queryKey: [QUERY_KEYS.FETCH_IDEAS],
    queryFn: () => getIdeas(),
  });
};
