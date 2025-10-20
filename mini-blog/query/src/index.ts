import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";

const EVENT_BUS_API_URL = "http://localhost:4005";

/**
 * Models
 */
// Post Model
type Post = {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
};

const posts = new Map<string, Post>();

// Comment Model
type CommentStatus = "pending" | "approved" | "rejected";

type Comment = {
  id: string;
  content: string;
  createdAt: Date;
  postId: string;
  status: CommentStatus;
};

const comments = new Map<string, Comment>();

/**
 * DTO
 */
type PostResponse = Post & {
  comments: Comment[];
};

/**
 * Events
 */
// Commend
const PostCreatedEventName = "PostCreated" as const;
const CommentCreatedEventName = "CommentCreated" as const;
const CommentUpdatedEventName = "CommentUpdated" as const;

type PostCreatedEvent = {
  type: typeof PostCreatedEventName;
  data: Post;
};

type CommentCreatedEvent = {
  type: typeof CommentCreatedEventName;
  data: Comment;
};

type CommentUpdatedEvent = {
  type: typeof CommentUpdatedEventName;
  data: Comment;
};

const app = new Hono();

app.use("*", cors());

app.onError((err, c) => {
  console.error(err);
  return c.json({ error: "Internal server error" }, 500);
});

function maskCommentByStatus(comment: Comment): Comment {
  let maskedContent = comment.content;
  if (comment.status === "rejected") {
    maskedContent = "This comment has been rejected!!";
  } else if (comment.status === "pending") {
    maskedContent = "This comment is moderating...";
  }

  return {
    ...comment,
    content: maskedContent,
  };
}

function handleEvent(
  event: PostCreatedEvent | CommentCreatedEvent | CommentUpdatedEvent
) {
  console.info("Processing event:", event.type, event.data);
  switch (event.type) {
    case PostCreatedEventName:
      posts.set(event.data.id, event.data);
      break;
    case CommentCreatedEventName:
    case CommentUpdatedEventName:
      comments.set(event.data.id, event.data);
      break;
  }
}

const getCommentsByPostId = (postId: string): Comment[] => {
  return Array.from(comments.values())
    .filter((comment) => comment.postId === postId)
    .map(maskCommentByStatus);
};

const getPostById = (id: string): PostResponse | undefined => {
  const post = posts.get(id);
  if (!post) {
    return undefined;
  }
  const commentsByPostId = getCommentsByPostId(post.id);
  return {
    ...post,
    comments: commentsByPostId,
  };
};

app.get("/posts", async (c) => {
  const allPosts = Array.from(posts.values())
    .map((post) => getPostById(post.id))
    .filter((post) => post !== undefined);
  return c.json({ posts: allPosts }, 200);
});

app.post("/events", async (c) => {
  const { type, data } = await c.req.json();
  console.info("Received event:", type, data);

  handleEvent({ type, data });

  return c.json({}, 200);
});

serve(
  {
    fetch: app.fetch,
    port: 4002,
  },
  async (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);

    const res = await fetch(`${EVENT_BUS_API_URL}/events`);
    const { events } = await res.json();

    for (const event of events) {
      handleEvent(event);
    }
    console.info("Events processed successfully");
  }
);
