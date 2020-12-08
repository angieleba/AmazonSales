import { Action } from '@ngrx/store';
import { LoginActionTypes } from 'src/app/login/LoginActionTypes';
import { ProductListStatuses } from './ProductListStatuses';
import { Product } from 'src/app/product/product.model';

export class ProductListRequest implements Action {
    readonly type = ProductListStatuses.Loading;
    constructor() {}
}

export class ProductListLoaded implements Action {
    readonly type = ProductListStatuses.Loaded;
    constructor(public products : Product[]) {
    }
}

export class ProductListFailed implements Action {
    readonly type = ProductListStatuses.Failed;
    constructor(public error : string){}
}

export type ProductListUnion = ProductListRequest | ProductListFailed | ProductListLoaded;