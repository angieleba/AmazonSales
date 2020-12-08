import { ProductListUnion } from "../actions/products.actions";
import { ProductListStatuses } from "../actions/ProductListStatuses";
import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Product } from "src/app/product/product.model";

export interface ProductState {
  loaded: boolean;
  error: string;
  products: Array<Product>;
}

const initialProductState: ProductState = {
  loaded: false,
  error: "",
  products: new Array<Product>(),
};

export function productReducer(state: ProductState = initialProductState,action: ProductListUnion) {
  switch (action.type) {
    case ProductListStatuses.Loading:
      return {
        ...state,
      };

    case ProductListStatuses.Loaded:
      return {
        ...state,
        products: action.products,
        loaded : true
      };

    case ProductListStatuses.Failed:
      return {
        ...state,
        error: action.error,
        loaded: false,
      };

    default:
      return {
        ...state,
      };
  }
}

export const getProductState = createFeatureSelector<ProductState>(
  "productState"
);
export const AreProductsLoaded = createSelector(
  getProductState,
  (state: ProductState) => state.loaded
);

export const ProductList = createSelector(
  getProductState,
  (state: ProductState) => state.products
);
