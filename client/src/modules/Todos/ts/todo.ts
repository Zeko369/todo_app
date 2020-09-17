import { QueryResult } from '@apollo/client';
import {
  ListsQuery,
  TagsQuery,
  Todo as TodoDB,
  List as ListDB,
  Tag as TagDB,
  Task as TaskDB,
  Comment as CommentDB,
  User as UserDB,
} from '../../../generated/graphql';

type List = Pick<ListDB, 'id' | 'title'>;
type Todo = Pick<TodoDB, 'id' | 'title' | 'description' | 'checked' | 'pinned' | 'createdAt'>;
type Tag = Pick<TagDB, 'id' | 'text' | 'color'>;
export type Task = Pick<TaskDB, 'id' | 'title' | 'checkedAt'>;
export type Comment = Pick<CommentDB, 'id' | 'title' | 'content' | 'createdAt'> & {
  user: Pick<UserDB, 'id' | 'username'>;
};

export interface TodoProps {
  mass: boolean;
  massSelect: boolean;
  massClick: (id: number) => void;
  todo: Todo & { list?: List } & { tags?: Tag[] } & { tasks: Task[] } & { comments: Comment[] };
  remove: (id: number) => Promise<unknown>;
  saveList: (id: number, listId: number) => Promise<unknown>;
  selectedTags: number[];
  compact: boolean;
  listsQuery: QueryResult<ListsQuery, {}>;
  tagsQuery: QueryResult<TagsQuery, {}>;
}
