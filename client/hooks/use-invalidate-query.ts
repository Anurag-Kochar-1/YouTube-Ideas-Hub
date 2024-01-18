import { QUERY_KEYS } from "@/constants/query-keys";
import { useQueryClient } from "@tanstack/react-query";

export const useInvalidateQuery = () => {
  const queryClient = useQueryClient();

  const fn = (key: keyof typeof QUERY_KEYS) => {
    return queryClient.invalidateQueries({
      queryKey: [key],
    });
  };

  return fn;
};
