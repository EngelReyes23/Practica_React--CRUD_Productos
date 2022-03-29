import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setShowForm } from "../../actions/ui";
import { FormProduct } from "./FormProduct";
import { Header } from "./Header";
import { ProductItem } from "./ProductItem";

export const HomeScreen = () => {
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);
  const { showForm } = useSelector((state) => state.ui);

  const handleShowForm = () => {
    dispatch(setShowForm());
  };

  return (
    <>
      <Header />

      <div className="home__container">
        <h1 className="title">Products</h1>

        {/* button add */}
        <button className="btn-add" onClick={handleShowForm}>
          <span className="material-icons-round">add_circle_outline</span>
          Add
        </button>

        {showForm && <FormProduct />}

        <div className="table__container">
          <table className="table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Product</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Provider</th>
                <th>Category</th>
                <th>Expiration date</th>
                <th>Crate At</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <ProductItem key={product.id} product={product} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
