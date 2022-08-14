import { appReducer } from './store/app.state';
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

import { StoreModule } from "@ngrx/store";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HomeComponent } from "./home/home.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { environment } from "../environments/environment";
import { EffectsModule } from '@ngrx/effects';


@NgModule({
  declarations: [
    AppComponent,

    HomeComponent,
    HeaderComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    EffectsModule.forRoot([]),
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
