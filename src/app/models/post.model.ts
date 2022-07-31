import { Note } from "./note.model";

export interface Post {
  id: Object | null;
  user_id: Object | null;
  title: string;
  content: string;
  subposts: Post[] | null;
  parentPost: Post | null;
  notes: Note[] | null;
  createdDate: Date | null;
  dueDate: Date | null;
}
