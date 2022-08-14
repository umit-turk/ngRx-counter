import { createReducer, on } from "@ngrx/store";
import {
  deletePost,
  updatePost,
  loadPostsSuccess,
  addPostSuccess,
} from "./posts.actions";
import { initialState } from "./posts.state";

const _postReducer = createReducer(
  initialState,
  on(addPostSuccess, (state: any, action: any) => {
    let post = { ...action.post };
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state: any, action: any) => {
    const updatedPosts = state.posts.map((post: { id: any }) => {
      return action.post.id === post.id ? action.post : post;
    });
    return {
      ...state,
      posts: updatedPosts,
    };
  }),
  on(deletePost, (state, { id }) => {
    const deletedPost = state.posts?.filter((post: any) => {
      return post?.id !== id;
    });
    return {
      ...state,
      posts: deletedPost,
    };
  }),
  on(loadPostsSuccess, (state, action) => {
    return {
      ...state,
      posts: action?.posts,
    };
  })
);

export function postReducer(state: any, action: any) {
  return _postReducer(state, action);
}
