import { TYPES } from "../types/TYPES";

const initialState = {
  products: [],
  loading: false,
  error: null,
};

export const productsReducer = (state = initialState, action) => {
  switch (action.type) {
    // Establece el arreglo de productos en el estado local
    case TYPES.productsSet:
      return {
        ...state,
        products: action.payload,
      };

    // Agrega un nuevo producto
    case TYPES.productsAddNew:
      return {
        ...state,
        products: [...state.products, action.payload],
      };

    // Borra un producto
    case TYPES.productsDelete:
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        ),
      };

    // Actualiza un producto
    case TYPES.productsUpdate:
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload.id ? action.payload : product
        ),
      };

    default:
      return state;
  }
};
