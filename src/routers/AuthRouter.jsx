import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import { LoginScreen } from "../components/auth/LoginScreen";
import { RegisterScreen } from "../components/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className={"auth__main"}>
      <div className="auth__box-container">
        <Switch>
          {/* LOGIN */}
          <Route exact path={"/auth/login"} component={LoginScreen} />
          {/* REGISTER */}
          {/* <Route exact path={"/auth/register"} component={RegisterScreen} /> */}
          {/* REDIRECT TO LOGIN */}
          <Redirect to={"/auth/login"} />
        </Switch>
      </div>
    </div>
  );
};
