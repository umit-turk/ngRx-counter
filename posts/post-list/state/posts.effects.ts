import { ofType } from "@ngrx/effects";
import { addPost, addPostSuccess, loadPosts, loadPostsSuccess } from "./posts.actions";
import { PostsService } from "./../../../services/posts.service";
import { Actions, createEffect } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { map, mergeMap } from "rxjs";

@Injectable()
export class PostsEffects {
  constructor(private actions$: Actions, private postsService: PostsService) {}

  loadPosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(loadPosts),
        mergeMap((action) => {
          return this.postsService.getPosts().pipe(
            map((posts:any) => {
              return loadPostsSuccess({posts})

            })
          );
        })
      );
    },
  );

  addPost$ = createEffect(() => {
    return this.actions$.pipe(ofType(addPost), mergeMap((action) => {
      return this.postsService.addPost(action.post).pipe(map((data) => {
        const post = {...action.post, id: data.name}
        return addPostSuccess({post})
      }))
    }))
  })



}
