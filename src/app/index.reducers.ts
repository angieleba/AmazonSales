import { ActionReducerMap, MetaReducer } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { environment } from 'src/environments/environment';
import { productReducer } from './home/product-effect/products.reducers';
import { loginReducer } from './login/login-effect/loginLogout.reducers';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const reducers: ActionReducerMap<AppState> = {
  loginState : loginReducer,
  productState : productReducer
};

