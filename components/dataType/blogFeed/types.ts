export type Post = {
  slug: string;
  title: string;
  content: string;
  thumbnailUrl: string;
  createdAt: Date;
  author: {
    name: string | null;
    image: string | null;
  };
};
