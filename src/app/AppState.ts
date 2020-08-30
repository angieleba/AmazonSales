import { LoginState, loginReducer } from './login/reducers/loginLogout.reducers';

export interface AppState {
    loginState : LoginState;
}
