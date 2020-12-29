
import { ProductState } from './home/product-effect/products.reducers';
import { LoginState } from './login/login-effect/loginLogout.reducers';

export interface AppState {
    loginState : LoginState;
    productState : ProductState;
}
