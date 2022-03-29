import React from "react";
import { HomeScreen } from "../products/HomeScreen";
import { Sidebar } from "./Sidebar";

export const JournalScreen = () => {
  return (
    <div className={"journal__main-content"}>
      <Sidebar />
      <HomeScreen />
    </div>
  );
};
