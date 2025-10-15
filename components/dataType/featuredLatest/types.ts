export type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: Date;
  likesCount: number;
  commentsCount: number;
  hasLiked?: boolean;
  author: {
    name: string | null;
    image: string | null;
  };
  likes: {
    id: string;
    userId: string;
    postId: string;
  }[];
};
