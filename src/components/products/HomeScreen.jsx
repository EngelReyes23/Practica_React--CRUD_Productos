import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowForm } from "../../actions/ui";
import { FormProduct } from "./FormProduct";
import { Header } from "./Header";
import { ProductItem } from "./ProductItem";

export const HomeScreen = () => {
  //#region Redux
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  const { products } = state.products;
  const { showForm } = state.ui;
  const { rol } = state.auth;
  //#endregion Redux

  const handleShowForm = () => {
    dispatch(setShowForm());
  };

  return (
    <>
      <Header />

      <div className="home__container">
        <h1 className="title">Products</h1>

        {/* button add */}
        <div className="message">
          <p className={rol === "cajero" && "msg__select"}>
            Select a product to see more details
          </p>
          {rol !== "cajero" && (
            <button className="btn-add" onClick={handleShowForm}>
              <span className="material-icons-round">add_circle_outline</span>
              Add
            </button>
          )}
        </div>

        {showForm && <FormProduct />}

        <div className="table__container">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Code</th>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Provider</th>
                <th>Category</th>
                <th>Expiration date</th>
                <th>Created At</th>
              </tr>
            </thead>
            <tbody>
              {/* Ordena los productos desde el más reciente */}
              {products
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((product, i) => (
                  <ProductItem i={i} key={product.id} product={product} />
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
