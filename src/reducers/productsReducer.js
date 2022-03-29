import { TYPES } from "../types/TYPES";

const initialState = {
  products: [],
  activeProduct: null,
  isEdit: false,
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

    // Establece el producto activo en el estado local
    case TYPES.productsSetActive:
      return {
        ...state,
        activeProduct: action.payload,
        isEdit: action.payload !== null ? true : false,
      };

    default:
      return state;
  }
};
