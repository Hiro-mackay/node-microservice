export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
}

export interface PostsResponse {
  posts: Post[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface CreatePostResponse {
  postId: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  commentId: string;
}
