import { QUERY_KEYS } from "@/constants/query-keys";
import { ourAxios } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

const getIdeaCategories = async () => {
  const res = await ourAxios.get(`/api/idea-category`);
  return res.data;
};

export const useIdeaCategoriesQuery = () => {
  return useQuery<{ id: string; name: string }[]>({
    queryKey: [QUERY_KEYS.FETCH_IDEA_CATEGORIES],
    queryFn: () => getIdeaCategories(),
    staleTime: Infinity,
    gcTime: Infinity,
  });
};
