import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";

export const AuthRouter = () => {
  return (
    <div className={"auth__main"}>
      <div className="auth__box-container">
        <Switch>
          {/* LOGIN */}
          <Route exact path={"/auth/login"} component={LoginScreen} />

          {/* REDIRECT TO LOGIN */}
          <Redirect to={"/auth/login"} />
        </Switch>
      </div>
    </div>
  );
};
