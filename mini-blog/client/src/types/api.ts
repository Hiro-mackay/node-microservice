export interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  createdAt: Date;
}

export interface PostsResponse {
  posts: Post[];
}

export interface CommentsResponse {
  postId: string;
  comments: Comment[];
}

export interface CreatePostRequest {
  title: string;
  content: string;
}

export interface CreatePostResponse {
  status: string;
  postId: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface CreateCommentResponse {
  status: string;
  commentId: string;
}
