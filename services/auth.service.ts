import { AuthResponseData } from "./../models/AuthResponseData.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { autoLogout } from "../auth/state/auth.actions";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  timeoutInterval: any;
  constructor(private http: HttpClient, private store: Store<AppState>) {}

  login(email: any, password: any): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  signUp(email: any, password: any): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new User(
      data.email,
      data.idToken,
      data.localId,
      expirationDate
    );
    return user;
  }

  getErrorMessage(mesage: string) {
    switch (mesage) {
      case "EMAIL_NOT_FOUND":
        return "Email Not Found";
      case "INVALID_PASSWORD":
        return "Invalid Password";
      case "EMAIL_EXIST":
        return "Email already exists";
      case "OPERATION_NOT_ALLOWED":
        return "Password sign-in is disabled for this project";
      case "TOO_MANY_ATTEMPTS_TRY_LATER":
        return "We have blocked all requests from this device due to unusual activity. Try again later";
      default:
        return "Unknown error occured. Please try again";
    }
  }

  setUserInLocalStorage(user: User) {
    localStorage.setItem("userData", JSON.stringify(user));
    this.runTimeoutInterval(user);
  }

  runTimeoutInterval(user: User) {
    const todaysDate = new Date().getTime();
    const expirationDate = user.expireDate.getTime();
    const timeInterval = expirationDate - todaysDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout())
    }, timeInterval);
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const expirationDate = new Date(userData.expirationDate);
      const user = new User(
        userData.email,
        userData.token,
        userData.localUd,
        expirationDate
      );
      this.runTimeoutInterval(user);
      return user;
    }
    return null;
  }

  logout() {
    localStorage.removeItem('userData');
    if(this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
     this.timeoutInterval = null;
    }
  }
}
