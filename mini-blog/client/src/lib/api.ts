import type {
  PostsResponse,
  CommentsResponse,
  CreatePostRequest,
  CreatePostResponse,
  CreateCommentRequest,
  CreateCommentResponse,
} from "../types/api";

const POSTS_API_URL = "http://localhost:4000";
const COMMENTS_API_URL = "http://localhost:4001";

export const postsApi = {
  async getPosts(): Promise<PostsResponse> {
    const response = await fetch(`${POSTS_API_URL}/posts`);
    if (!response.ok) {
      throw new Error("Failed to fetch posts");
    }
    return response.json();
  },

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
  async getComments(postId: string): Promise<CommentsResponse> {
    const response = await fetch(
      `${COMMENTS_API_URL}/posts/${postId}/comments`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return response.json();
  },

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
