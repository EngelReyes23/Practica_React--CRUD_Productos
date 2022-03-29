import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowForm } from "../../actions/ui";
import { FormProduct } from "./FormProduct";
import { Header } from "./Header";
import { ProductItem } from "./ProductItem";

export const HomeScreen = () => {
  //#region Redux
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { showForm } = useSelector((state) => state.ui);
  const { rol } = useSelector((state) => state.auth);
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
        {rol !== "cajero" && (
          <button className="btn-add" onClick={handleShowForm}>
            <span className="material-icons-round">add_circle_outline</span>
            Add
          </button>
        )}

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
              {products
                .sort((a, b) => b.createdAt - a.createdAt)
                .map((product, i) => (
                  <ProductItem i={i} key={product.id} product={product} />
                ))}
              {/* Ordena los productos del mas reciente */}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
