import { ActionReducerMap, MetaReducer, combineReducers } from '@ngrx/store';
import { AppState } from 'src/app/AppState';
import { loginReducer } from './login/reducers/loginLogout.reducers';
import { environment } from 'src/environments/environment';
import { productReducer } from './home/reducers/products.reducers';

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [] : [];

export const reducers: ActionReducerMap<AppState> = {
  loginState : loginReducer,
  productState : productReducer
};

