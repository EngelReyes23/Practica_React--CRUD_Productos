import React from "react";
import { ProductsSection } from "../products/ProductsSection";
import { Sidebar } from "./Sidebar";

export const JournalScreen = () => {
  return (
    <div className={"journal__main-content"}>
      <Sidebar />
      <ProductsSection />
    </div>
  );
};
