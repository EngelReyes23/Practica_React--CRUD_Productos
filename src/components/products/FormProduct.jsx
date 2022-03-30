import React, { useEffect, useState } from "react";
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

const providers = {
  refreshments: ["Coca Cola", , "Pepsi", "Fanta", "Big Cola"],
  snacks: ["Bocadeli", "Diana", "Jummies"],
};

const categories = {
  refreshments: ["Refreshments", "Water", "Juices"],
  snacks: ["Snacks", "Cigarettes", "Beers"],
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

  const [isDisabled, setIsDisabled] = useState(false);
  //#endregion States

  //#region Handlers
  const handleIsDisabled = () => {
    if (isEdit) {
      rol === "cajero" && setIsDisabled(true);
    } else setIsDisabled(false);
  };

  const handleHideForm = () => {
    dispatch(setHideForm());
    dispatch(setActiveProduct(null));
  };

  const formIsValid = () => {
    if (
      category.trim() === "" ||
      code.trim() === "" ||
      description.trim() === "" ||
      expirationDate.trim() === "" ||
      name.trim() === "" ||
      price <= 0 ||
      provider.trim() === "" ||
      stock <= 0
    )
      return false;

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formIsValid()) {
      !isEdit
        ? dispatch(startNewProduct(formValues))
        : dispatch(startUpdateProduct(formValues));

      dispatch(setActiveProduct(null));
      dispatch(setHideForm());
    } else {
      Swal.fire({
        title: "Error!",
        text: "All fields are required",
        icon: "error",
      });
    }
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
        dispatch(setHideForm());
      }
    });
  };
  //#endregion Handlers

  //#region Effects
  useEffect(() => {
    handleIsDisabled();
  }, []);
  //#endregion Effects

  return (
    <div className="form__container">
      <form
        className="form__newProduct animate__animated animate__fadeIn"
        onSubmit={handleSubmit}
      >
        <h1>Product</h1>
        <div className="form__group">
          <div>
            <label htmlFor="code">Code</label>
            <input
              disabled={isDisabled}
              id="code"
              className="form__input"
              value={code}
              type="number"
              name={"code"}
              placeholder="Code"
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label htmlFor="name">Product</label>
            <input
              disabled={isDisabled}
              id="name"
              className="form__input"
              value={name}
              type="text"
              name="name"
              placeholder="Product name"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            disabled={isDisabled}
            id="description"
            className="form__input"
            value={description}
            type="text"
            name="description"
            placeholder="Description"
            onChange={handleInputChange}
          />
        </div>

        <div className="form__group">
          <div>
            <label htmlFor="price">Price</label>
            <input
              disabled={isDisabled}
              id="price"
              className="form__input"
              value={price}
              type="number"
              min="1"
              name="price"
              placeholder="Price"
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label htmlFor="stock">Stock</label>
            <input
              disabled={isDisabled}
              id="stock"
              className="form__input"
              value={stock}
              min="0"
              type="number"
              name="stock"
              placeholder="Stock"
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="form__group ">
          <div>
            <label htmlFor="provider">Provider</label>
            <select
              disabled={isDisabled}
              id="provider"
              className="form__input"
              value={provider}
              type="text"
              name="provider"
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a provider
              </option>
              <optgroup label={"Refreshments"}>
                {providers.refreshments.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </optgroup>
              <optgroup label={"Snacks"}>
                {providers.snacks.map((provider) => (
                  <option key={provider} value={provider}>
                    {provider}
                  </option>
                ))}
              </optgroup>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label htmlFor="category">Category</label>
            <select
              disabled={isDisabled}
              id="category"
              className="form__input"
              value={category}
              type="text"
              name="category"
              onChange={handleInputChange}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.refreshments.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              {categories.snacks.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="form__group expirationDate">
          <label>Expiration date</label>
          <input
            disabled={isDisabled}
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
