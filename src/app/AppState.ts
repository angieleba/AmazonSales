import { LoginState, loginReducer } from './login/reducers/loginLogout.reducers';
import { ProductState } from './home/reducers/products.reducers';

export interface AppState {
    loginState : LoginState;
    productState : ProductState;
}
