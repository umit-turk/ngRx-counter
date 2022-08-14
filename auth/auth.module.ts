import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from "@ngrx/store";
import { RouterModule } from "@angular/router";
import { Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { AUTH_STATE_NAME } from "./state/auth.selector";
import { AuthReducer } from "./state/auth.reducer";
import { AuthEffects } from './state/auth.effects';

const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EffectsModule.forFeature([AuthEffects]),
    StoreModule.forFeature(AUTH_STATE_NAME, AuthReducer),
    RouterModule.forChild(routes),
  ],
})
export class AuthModule {}
