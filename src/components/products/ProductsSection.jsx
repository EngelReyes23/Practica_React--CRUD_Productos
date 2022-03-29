import React from "react";
import { Header } from "./Header";

export const ProductsSection = () => {
  return (
    <div className={"section__products"}>
      <Header />
      <h1 className={"title"}>Productos</h1>

      {/* Buscador */}
      <div className={"search"}>
        <input type="text" placeholder="Buscar" />
        <button className={'btn btn-search '}>Buscar</button>
      </div>

      {/* Edicion */}
      <div className={"edition"}>
        <button>Nuevo</button>
        <button className={'btn-edition'}>Editar</button>
        <button>Eliminar</button>
      </div>

      <div className="content">
        <table className={'table'}>
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
            <tr>
              <td>007</td>
              <td>CocaCola</td>
              <td>1 litro</td>
              <td>$20</td>
              <td>500</td>
              <td>Coca-Cola</td>
              <td>Refrescos</td>
              <td>12-12-25</td>
              <td>23-10-24</td>
            </tr>
            <tr>
              <td>007</td>
              <td>CocaCola</td>
              <td>1 litro</td>
              <td>$20</td>
              <td>500</td>
              <td>Coca-Cola</td>
              <td>Refrescos</td>
              <td>12-12-25</td>
              <td>23-10-24</td>
            </tr>
            <tr>
              <td>007</td>
              <td>CocaCola</td>
              <td>1 litro</td>
              <td>$20</td>
              <td>500</td>
              <td>Coca-Cola</td>
              <td>Refrescos</td>
              <td>12-12-25</td>
              <td>23-10-24</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
