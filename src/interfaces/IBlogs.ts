export interface IBlogs {
  id: number;
  id_post: number;
  post_title: string;
  post_cover: string;
  post_short_text: string;
  post_text: string;
  post_meta_description: string;
  id_category: number;
  post_url: string;
  created_at: any;
  updated_at: any;
  data: [];
  next_page_url: string;
}
