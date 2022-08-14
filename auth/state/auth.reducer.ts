import { loginSuccess } from './auth.actions';
import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';


const _authReducer = createReducer(initialState, on(loginSuccess, (state, action) => {
  return {
    ...state,
    user:action.user
  }
}));

export function AuthReducer(state : any, action: any) {
  return _authReducer(state, action)
}
