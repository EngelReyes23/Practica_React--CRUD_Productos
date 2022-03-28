import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";
import { startNewNote } from "../../actions/notes";
import { startNewProduct } from "../../actions/products";
import { JournalEntries } from "./JournalEntries";

export const Sidebar = () => {
  //#region Redux
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.auth);
  //#endregion Redux

  //#region Handles
  const handleLogout = () => {
    dispatch(startLogout());
  };

  const handleNewEntry = () => {
    dispatch(startNewNote());
    dispatch(startNewProduct());
  };
  //#endregion Handles

  return (
    <aside className={"journal__sidebar"}>
      <div className="journal__sidebar-navbar">
        <h3 className={""}>
          <span className="material-icons-round">dark_mode</span>
          <span>{name}</span>
        </h3>

        <button className={" btn btn-logOut"} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="journal__sidebar-entry" onClick={handleNewEntry}>
        <span className="material-icons md-48">add_box</span>
        <span>New Entry</span>
      </div>
      <JournalEntries />
    </aside>
  );
};
