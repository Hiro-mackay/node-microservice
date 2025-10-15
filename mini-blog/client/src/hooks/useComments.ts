import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { commentsApi } from "../lib/api";
import type { CreateCommentRequest } from "../types/api";

export function useComments(postId: string) {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => commentsApi.getComments(postId),
    enabled: !!postId,
  });
}

export function useCreateComment(postId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCommentRequest) =>
      commentsApi.createComment(postId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
}
