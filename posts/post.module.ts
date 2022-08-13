import { ReactiveFormsModule } from '@angular/forms';
import { PostListComponent } from "./post-list/post-list.component";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AddPostComponent } from "./add-post/add-post.component";
import { EditPostComponent } from "./edit-post/edit-post.component";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent,
    children: [
      { path: "add", component: AddPostComponent },
      { path: "edit/:id", component: EditPostComponent },
    ],
  },
];
@NgModule({
  declarations: [PostListComponent, AddPostComponent, EditPostComponent],
  imports: [CommonModule, ReactiveFormsModule,RouterModule.forChild(routes)],
})
export class PostModule {}
