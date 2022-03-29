import React from "react";
import { useDispatch, useSelector } from "react-redux";
import validator from "validator";
import { loginWidthEmailPassword, loginWidthGoogle } from "../../actions/auth";
import { showError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {
  //#region Redux
  // dispatch for actions from react-redux
  const dispatch = useDispatch();

  // selector for the state from react-redux
  const { msgError, loading } = useSelector((state) => state.ui);
  //#endregion Redux

  //#region States
  const { handleInputChange, formValues } = useForm({
    email: "admin@admin.com",
    password: "admin123",
  });

  const { email, password } = formValues;
  //#endregion States

  //#region Handles
  // Verifica si los campos son validos
  const isValid = () => {
    if (email.trim().length === 0) {
      dispatch(showError("Email is required"));
      return false;
    } else if (!validator.isEmail(email)) {
      dispatch(showError("Email is not valid"));
      return false;
    } else if (password.length === 0) {
      dispatch(showError("Password is required"));
      return false;
    }

    return true;
  };

  // Hace el dispatch para el login
  const handleLogin = (e) => {
    e.preventDefault();

    // Verifica si los campos son validos para hacer el dispatch
    if (isValid()) dispatch(loginWidthEmailPassword(email, password));
  };

  // Hace el dispatch para el login con google
  const handleGoogleLogin = (e) => {
    e.preventDefault();
    dispatch(loginWidthGoogle());
  };
  //#endregion Handles

  return (
    <form className={"auth__form"} onSubmit={handleLogin}>
      <h3 className={"auth__title"}>Login</h3>
      {/* <button
        onClick={handleGoogleLogin}
        type={"button"}
        className={"btn btn-google"}
      >
        {" "}
        <img
          className="google-icon"
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="google button"
        />{" "}
        Log in with Google
      </button> */}

      {msgError && <div className="auth__alert-error">{msgError}</div>}

      <label className={"label"} htmlFor="email">
        Email
      </label>
      <input
        id="email"
        className={"auth__input"}
        type="email"
        placeholder={"Email@domain"}
        name="email"
        value={email}
        autoComplete={"off"}
        onChange={handleInputChange}
      />

      <label className={"label"} htmlFor="password">
        Password
      </label>
      <input
        value={password}
        id="password"
        className={"auth__input"}
        type="password"
        placeholder={"********"}
        name="password"
        autoComplete={"off"}
        onChange={handleInputChange}
      />

      <button disabled={loading} className={`btn btn-login`} type="submit">
        Login
      </button>

      {/* <p className={"QuestionRegistration"}>Don´t have an account?</p>

      <Link to="/auth/register" className={"btn btn-singUP"}>
        Sing up
      </Link> */}
    </form>
  );
};
