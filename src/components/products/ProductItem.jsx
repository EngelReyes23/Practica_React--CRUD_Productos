import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../../actions/products";
import { setShowForm } from "../../actions/ui";

export const ProductItem = ({ product }) => {
  const createdAt = moment(product.createdAt).format("DD/MM/YYYY");
  const expirationDate = moment(product.expirationDate).format("DD/MM/YYYY");

  const dispatch = useDispatch();

  const handleShowProduct = () => {
    dispatch(setActiveProduct(product));
    dispatch(setShowForm());
  };

  return (
    <tr
      onDoubleClick={() => {
        console.log(product);
        handleShowProduct();
      }}
    >
      <td>{product.code}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.stock}</td>
      <td>{product.provider}</td>
      <td>{product.category}</td>
      <td>{expirationDate}</td>
      <td>{createdAt}</td>
    </tr>
  );
};
