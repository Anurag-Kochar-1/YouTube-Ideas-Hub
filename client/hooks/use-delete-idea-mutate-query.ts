import { useMutation } from "@tanstack/react-query";
import { useInvalidateQuery } from "./use-invalidate-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ourAxios } from "@/lib/axios";


export const useDeleteIdeaMutateQuery = () => {
  const invalidateQuery = useInvalidateQuery()
  return useMutation({
    mutationFn: (id: string) => {
      return ourAxios.delete(`/api/idea?id=${id}`);
    },
    onSuccess() {
      invalidateQuery(QUERY_KEYS.FETCH_MY_IDEAS)
      invalidateQuery(QUERY_KEYS.FETCH_IDEAS)
    },
  });
};
