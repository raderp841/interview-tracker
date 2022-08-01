
export interface Post {
  _id: string | null;
  user_id: Object | null;
  title: string;
  content: string;
  subposts: Post[] | null;
  parentPost: Post | null;
  notes: string[] | null;
  createdDate: Date | null;
  dueDate: Date | null;
}
