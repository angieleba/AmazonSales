import { User } from "../user.model";
import { LoginActionTypes } from "../LoginActionTypes";
import {
  LoginActionsUnion
} from "../actions/login.actions";
import { LoginStatuses } from "../LoginStatuses";
import { LogoutStatuses } from "../LogoutStatuses";
import { AppState } from 'src/app/AppState';
import { createFeatureSelector, createSelector, MetaReducer, ActionReducerMap } from '@ngrx/store';
import { environment } from 'src/environments/environment';

export interface LoginState {
  User: User | null;
  IsLoggedIn: boolean;
  LoginStatus: LoginStatuses;
  LogoutStatus: LogoutStatuses;
  Error: string;
}

const initialLoginState: LoginState = {
  User: null,
  IsLoggedIn: false,
  Error: "",
  LoginStatus: LoginStatuses.None,
  LogoutStatus: LogoutStatuses.None,
};

export function loginReducer(
  state: LoginState = initialLoginState,
  action: LoginActionsUnion
): LoginState {
  switch (action.type) {
    case LoginActionTypes.LoginRequest:
      return {
        ...state,
        LoginStatus: LoginStatuses.InProgress,
      };

    case LoginActionTypes.LoginSuccessful:
      return {
        ...state,
        User: action.user,
        IsLoggedIn: true,
        Error: "",
        LoginStatus: LoginStatuses.Successful,
      };

    case LoginActionTypes.LoginError:
      console.log(action.error);
      return {
        ...state,
        User: null,
        IsLoggedIn: false,
        LoginStatus: LoginStatuses.Failed,
        Error: action.error,
      };
    case LoginActionTypes.LogoutRequest:
      return {
        ...state,
        LogoutStatus: LogoutStatuses.InProgress
      };

    case LoginActionTypes.LogoutSuccessful:
      console.log("enters logout success");
      return {
        User: null,
        Error : "",
        IsLoggedIn: false,
        LogoutStatus: LogoutStatuses.Successful,
        LoginStatus: LoginStatuses.None,
      };
  
      case LoginActionTypes.LogoutError:
        return {
          ...state,
          LogoutStatus: LogoutStatuses.Failed,
          Error: action.error,
        };
    default:
      return {
        ...state
      }
  }
}

export const getLoginState = createFeatureSelector<LoginState>('loginState');
export const UserIsLoggedin = createSelector(
  getLoginState,
  (state : LoginState) => state.IsLoggedIn
);

export const GetUser = createSelector(
  getLoginState,
  state => state.User
);


