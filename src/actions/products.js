import Swal from "sweetalert2";
import { db } from "../firebase/firebaseConfig";
import { loadProducts } from "../helpers/loadProducts";
import { TYPES } from "../types/TYPES";
import { finishLoading, startLoading } from "./ui";

const collectionPath = `products`;

//#region Create Product
// Agrega un nuevo producto al estado local
const addNewProduct = (id, product) => ({
  type: TYPES.productsAddNew,
  payload: { id, ...product },
});

// Agrega un nuevo producto a la base de datos
// TODO: Adaptar para que reciba un objeto con todos los datos del producto
export const startNewProduct = (newProduct) => {
  return async (dispatch) => {
    dispatch(startLoading());

    newProduct.createdAt = new Date().getTime();

    try {
      // Sube el producto a firebase
      const doc = await db.collection(collectionPath).add(newProduct);

      dispatch(addNewProduct(doc.id, newProduct)); // Agrega el producto a la lista de productos
      dispatch(finishLoading());

      // Alerta de éxito
      Swal.fire(
        "Product created",
        "The product has been created correctly",
        "success"
      );
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
    } catch (error) {
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

      // Alerta de éxito
      Swal.fire(
        "Updated product",
        "The product has been updated correctly",
        "success"
      );
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
      await db.doc(`${collectionPath}/${id}`).delete();

      dispatch(deleteProduct(id)); // Borra el producto del estado local
      dispatch(finishLoading());

      // Alerta de éxito
      Swal.fire(
        "Deleted product",
        "The product has been deleted correctly",
        "success"
      );
    } catch (err) {
      dispatch(finishLoading());
      Swal.fire("Error", err.message, "error");
    }
  };
};
//#endregion Delete Product

export const setActiveProduct = (product) => ({
  type: TYPES.productsSetActive,
  payload: product,
});
