import { autoLogout, loginSuccess, signUpSuccess } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';


const _authReducer = createReducer(initialState, on(loginSuccess, (state, action) => {
  return {
    ...state,
    user:action.user
  }
}),
on(signUpSuccess, (state, action) => {
  return {
    ...state,
    user: action.user
  }
}),
on(autoLogout, (state, action) => {
  return {
    ...state,
    user: null
  }
})
);

export function AuthReducer(state : any, action: any) {
  return _authReducer(state, action)
}
