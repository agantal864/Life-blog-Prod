export type Post = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  thumbnailUrl: string;
  views: number;
  anonymousViews: number;
  createdAt:  Date;
  likesCount: number;
  commentsCount: number;
  hasLiked?: boolean;
  author: {
    name: string | null;
    image: string | null;
  };
  comments: {
    id: string;
    content: string;
    createdAt:  Date;
    author: {
      id: string | null;
      name: string | null;
      image: string | null;
    };
  }[];
};