import { map, Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "../models/posts.model";

@Injectable({
  providedIn: "root",
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post []> {
    return this.http
      .get<Post[]>(`https://ngrx-1183a-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map((data) => {
          const posts: any  = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{name: string}> {
    return this.http.post<{name: string}>(`https://ngrx-1183a-default-rtdb.firebaseio.com/posts.json`,post)
  }


}
