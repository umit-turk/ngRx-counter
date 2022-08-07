import { Validators } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/posts.model";
import { AppState } from "./../../store/app.state";
import { Store } from "@ngrx/store";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { getPostById } from "../post-list/state/posts.selector";
import { FormGroup } from "@angular/forms";
import { updatePost } from "../post-list/state/posts.actions";

@Component({
  selector: "app-edit-post",
  templateUrl: "./edit-post.component.html",
  styleUrls: ["./edit-post.component.css"],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post?: Post | any;
  postForm?: FormGroup | any;
  postSubscription?: Subscription;
  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this.postSubscription = this.store
        .select(getPostById, { id })
        .subscribe((data) => {
          this.post = data;
          this.createForm();
        });
    });
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }

  onSubmit() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };

    //dispatch the action
    this.store.dispatch(updatePost({ post }));
    this.router.navigate(['posts'])
  }

  createForm(): any {
    this.postForm = new FormGroup({
      title: new FormControl(this.post.title, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(this.post.description, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }
}
