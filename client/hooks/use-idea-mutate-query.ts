import { useMutation } from "@tanstack/react-query";
import { useInvalidateQuery } from "./use-invalidate-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { ourAxios } from "@/lib/axios";
import { useIdeaModal } from "./use-idea-modal";

type newIdeaDTO = {
    title: string
    description?:string
    categories?: string[]
    suggestedFor?: string[];
}

export const useIdeaMutateQuery = () => {
  const ideaModal = useIdeaModal();
  const invalidateQuery = useInvalidateQuery()
  return useMutation({
    mutationFn: (newIdea: newIdeaDTO) => {
      return ourAxios.post("/api/idea", newIdea);
    },
    onSuccess() {
      invalidateQuery(QUERY_KEYS.FETCH_IDEAS)
      ideaModal.onClose()
    },
    
  });
};
