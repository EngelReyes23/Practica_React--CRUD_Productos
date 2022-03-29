import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  setActiveProduct,
  startDeleteProduct,
  startNewProduct,
  startUpdateProduct,
} from "../../actions/products";
import { setHideForm } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

// Cuerpo del producto
const newProduct = {
  // createdAt: new Date().getTime(),
  category: "",
  code: "",
  description: "",
  expirationDate: "",
  name: "",
  price: 0,
  provider: "",
  stock: 0,
};

export const FormProduct = () => {
  //#region Redux
  const dispatch = useDispatch();

  const { activeProduct, isEdit } = useSelector((state) => state.products);
  const { rol } = useSelector((state) => state.auth);
  //#endregion Redux

  //#region States
  const { formValues, handleInputChange } = useForm(
    activeProduct || newProduct
  );

  const {
    category,
    code,
    description,
    expirationDate,
    name,
    price,
    provider,
    stock,
  } = formValues;
  //#endregion States

  //#region Handlers
  const handleHideForm = () => {
    dispatch(setHideForm());
    dispatch(setActiveProduct(null));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    !isEdit
      ? dispatch(startNewProduct(formValues))
      : dispatch(startUpdateProduct(formValues));

    dispatch(setActiveProduct(null));
    dispatch(setHideForm());
  };

  const handleDelete = () => {
    Swal.fire({
      title: "You're sure?",
      text: "Once deleted, you will not be able to recover this record",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#30475E",
      cancelButtonColor: "#F05454",
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setActiveProduct(null));
        dispatch(startDeleteProduct(activeProduct.id));
      }
    });
  };
  //#endregion Handlers

  return (
    <div className="form__container">
      <form
        className="form__newProduct animate__animated animate__fadeIn"
        onSubmit={handleSubmit}
      >
        <h1>Product</h1>
        <div>
          <label htmlFor="code">Code</label>
          <input
            id="code"
            className="form__input"
            value={code}
            type="number"
            name={"code"}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="name">Product</label>
          <input
            id="name"
            className="form__input"
            value={name}
            type="text"
            name="name"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            className="form__input"
            value={description}
            type="text"
            name="description"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="price">Price</label>
          <input
            id="price"
            className="form__input"
            value={price}
            type="number"
            min="1"
            name="price"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="stock">Stock</label>
          <input
            id="stock"
            className="form__input"
            value={stock}
            min="0"
            type="number"
            name="stock"
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="provider">Provider</label>
          <select
            id="provider"
            className="form__input"
            value={provider}
            type="text"
            name="provider"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a Supplier
            </option>
            <option value="Coca-Cola">Coca-Cola</option>
            <option value="Pepsi">Pepsi</option>
            <option value="Bimbo">Bimbo</option>
            <option value="Sprite">Sprite</option>
            <option value="Coca-Cola Zero">Coca-Cola Zero</option>
            <option value="Coca-Cola Light">Coca-Cola Light</option>
          </select>
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            className="form__input"
            value={category}
            type="text"
            name="category"
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select a Category
            </option>
            <option value="Agua">Agua</option>
            <option value="Galletas">Galletas</option>
            <option value="Cigarrillos">Cigarrillos</option>
            <option value="Cerveza">Cerveza</option>
            <option value="Jugos">Jugos</option>
          </select>
        </div>

        <div>
          <label>Expiration date</label>
          <input
            className="form__input"
            value={expirationDate}
            type="date"
            onChange={handleInputChange}
            name="expirationDate"
          />
        </div>

        <div className="buttons">
          {rol !== "cajero" && (
            <button className="btn btn-save">
              <span className="material-icons-round">save</span>
              <span>Save</span>
            </button>
          )}
          {rol !== "cajero" && (
            <button
              disabled={!isEdit}
              type="button"
              className="btn btn-delete"
              onClick={handleDelete}
            >
              <span className="material-icons-round">delete_outline</span>
              <span>Delete</span>
            </button>
          )}
          <button
            onClick={handleHideForm}
            type="button"
            className="btn btn-cancel"
          >
            {rol !== "cajero" ? "Cancel" : "Close"}
          </button>
        </div>
      </form>
    </div>
  );
};
