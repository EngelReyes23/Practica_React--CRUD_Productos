import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { setActiveProduct } from "../../actions/products";
import { setShowForm } from "../../actions/ui";

export const ProductItem = ({ product, i }) => {
  const createdAt = moment(product.createdAt).fromNow();
  const expirationDate = moment(product.expirationDate).format("DD MMMM YYYY");

  const dispatch = useDispatch();

  const handleShowProduct = () => {
    dispatch(setActiveProduct(product));
    dispatch(setShowForm());
  };

  return (
    <tr
      onClick={() => {
        console.log(product);
        handleShowProduct();
      }}
    >
      <td>{++i}</td>
      <td>{product.code}</td>
      <td>{product.name}</td>
      <td>{product.description}</td>
      <td>{`$ ${product.price}`}</td>
      <td>{product.stock}</td>
      <td>{product.provider}</td>
      <td>{product.category}</td>
      <td>{expirationDate}</td>
      <td>{createdAt}</td>
    </tr>
  );
};
