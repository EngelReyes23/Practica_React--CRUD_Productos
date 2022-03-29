import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startLogout } from "../../actions/auth";

export const Header = () => {
  //#region Redux
  const dispatch = useDispatch();

  const { name, email } = useSelector((state) => state.auth);
  //#endregion Redux

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <header className="header">
      <div className="userInfo">
        <span className="material-icons-round">account_circle</span>
        <div>
          <p className="userName">{name}</p>
          <p className="userEmail">{email}</p>
        </div>
      </div>
      <button onClick={handleLogout} className={"btn-logout"}>
        Logout
      </button>
    </header>
  );
};
