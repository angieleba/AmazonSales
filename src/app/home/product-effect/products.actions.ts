import { Action } from '@ngrx/store';
import { LoginActionTypes } from 'src/app/login/login-effect/LoginActionTypes';
import { Product } from '../models/Product';
import { ProductListStatuses } from './ProductListStatuses';

export class ProductListRequest implements Action {
    readonly type = ProductListStatuses.Loading;
    constructor() {}
}

export class ProductListLoaded implements Action {
    readonly type = ProductListStatuses.Loaded;
    constructor(public products : Array<Product>) {
    }
}

export class ProductListFailed implements Action {
    readonly type = ProductListStatuses.Failed;
    constructor(public error : string){}
}

export type ProductListUnion = ProductListRequest | ProductListFailed | ProductListLoaded;