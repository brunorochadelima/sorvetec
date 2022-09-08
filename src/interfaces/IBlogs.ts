export interface IBlogs {
  id: number;
  id_post: number;
  post_title: string;
  post_cover: string;
  post_short_text: string;
  post_text: string;
  id_category: number;
  created_at: Date;
  updated_at: Date | null;
  data: [];
}
