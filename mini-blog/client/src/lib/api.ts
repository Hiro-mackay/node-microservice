import type {
  PostsResponse,
  CreatePostRequest,
  CreatePostResponse,
  CreateCommentRequest,
  CreateCommentResponse,
} from "../types/api";

const POSTS_API_URL = "http://localhost:4000";
const COMMENTS_API_URL = "http://localhost:4001";
const QUERY_API_URL = "http://localhost:4002";

export const postsApi = {
  async createPost(data: CreatePostRequest): Promise<CreatePostResponse> {
    const response = await fetch(`${POSTS_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Failed to create post");
    }
    return response.json();
  },
};

export const commentsApi = {
  async createComment(
    postId: string,
    data: CreateCommentRequest
  ): Promise<CreateCommentResponse> {
    const response = await fetch(
      `${COMMENTS_API_URL}/posts/${postId}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to create comment");
    }
    return response.json();
  },
};

export const queryApi = {
  async getPosts(): Promise<PostsResponse> {
    const response = await fetch(`${QUERY_API_URL}/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  },
};
