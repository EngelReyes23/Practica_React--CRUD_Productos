import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { loadProducts } from "../helpers/loadProducts";
import { TYPES } from "../types/TYPES";
import { finishLoading, startLoading } from "./ui";

const collectionPath = `productos/`;

//#region Create Product
// Agrega un nuevo producto al estado local
const addNewProduct = (id, product) => ({
  type: TYPES.productsAddNew,
  payload: { id, ...product },
});

// Agrega un nuevo producto a la base de datos
export const startNewProduct = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    // Cuerpo del producto
    const newProduct = {
      category: "",
      description: "",
      name: "",
      price: 0,
      provider: "",
    };

    try {
      // Sube el producto a firebase
      const doc = await db.collection(collectionPath).add(newProduct);

      dispatch(addNewProduct(doc.id, newProduct)); // Agrega el producto a la lista de productos
      dispatch(finishLoading());
    } catch {
      Swal.fire("Error", "The product could not be added", "error");
      dispatch(finishLoading());
    }
  };
};
//#endregion Create Product

//#region Get Products
// Establece el arreglo de productos en el estado local
export const setProducts = (product) => ({
  type: TYPES.productsSet,
  payload: product,
});

// Obtiene todos los productos de la base de datos
export const getAllProducts = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      // loadProducts: obtiene la lista de productos de la base de datos
      const products = await loadProducts();

      dispatch(setProducts(products)); // Establece los productos en el estado
      dispatch(finishLoading());
    } catch {
      Swal.fire("Error", "The list of products could not be loaded", "error");
      dispatch(finishLoading());
    }
  };
};
//#endregion Get Products

//#region Update Product
const updateProduct = (id) => ({
  type: TYPES.productsUpdate,
  payload: id,
});

export const startUpdateProduct = (product) => {
  return async (dispatch) => {
    dispatch(startLoading());

    const productToFireStore = { ...product };
    delete productToFireStore.id;

    try {
      await db
        .doc(`${collectionPath}/${product.id}`)
        .update(productToFireStore);

      dispatch(updateProduct(product.id)); // Actualiza el producto en el estado local
    } catch {
      Swal.fire("Error", "The product could not be updated", "error");
      dispatch(finishLoading());
    }
  };
};
//#endregion Update Product

//#region Delete Product
// Borra el producto localmente del estado
const deleteProduct = (id) => ({
  type: TYPES.productsDelete,
  payload: id,
});

// Borra el producto de la base de datos
export const startDeleteProduct = (id) => {
  return async (dispatch) => {
    dispatch(startLoading());

    try {
      await db.collection(`${collectionPath}/${id}`).delete();

      dispatch(deleteProduct(id)); // Borra el producto del estado local
      dispatch(finishLoading());
    } catch {
      dispatch(finishLoading());
      Swal.fire("Error", "The product could not be deleted", "error");
    }
  };
};
//#endregion Delete Product
