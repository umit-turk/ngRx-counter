import { appReducer } from './store/app.state';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CounterComponent } from "./counter/counter/counter.component";
import { CounterOutputComponent } from "./counter/counter-output/counter-output.component";
import { CounterButtonsComponent } from "./counter/counter-buttons/counter-buttons.component";
import { StoreModule } from "@ngrx/store";
import { counterReducer } from "./counter/state/counter.reducer";
import { CustomCounterInputComponent } from "./counter/custom-counter-input/custom-counter-input.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { AddPostComponent } from './posts/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    CounterComponent,
    CounterOutputComponent,
    CounterButtonsComponent,
    CustomCounterInputComponent,
    HomeComponent,
    HeaderComponent,
    PostListComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
