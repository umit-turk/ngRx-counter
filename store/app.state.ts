import { PostsState } from '../posts/post-list/state/posts.state';
import { CounterState } from './../counter/state/counter.state';

import {counterReducer} from '../counter/state/counter.reducer';
import { postReducer } from '../posts/post-list/state/posts.reducer';


export interface AppState {
  counter: CounterState,
  posts: PostsState;
}


export const appReducer = {
  counter: counterReducer,
  posts: postReducer
}
