export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string;
  created_at: string;
};

export type GetCategoriesParams = {
  paginate?: boolean;
  start?: number;
  end?: number;
};
