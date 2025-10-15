import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { postsApi } from "../lib/api";
import type { CreatePostRequest } from "../types/api";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: postsApi.getPosts,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePostRequest) => postsApi.createPost(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}
