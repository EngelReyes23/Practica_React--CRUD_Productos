import Swal from "sweetalert2";
import { firebase, googleAuthProvider } from "../firebase/firebaseConfig";
import { TYPES } from "../types/TYPES";
import { notesLogout } from "./notes";
import { finishLoading, showError, startLoading } from "./ui";

//#region Login
// Inicia sesión en firebase con Email y Password
export const loginWidthEmailPassword = (email, password) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email));
        dispatch(finishLoading());
      })
      .catch((error) => {
        dispatch(finishLoading());
        dispatch(showError(error.message));
        Swal.fire("Error", error.message, "error");
      });
  };
};

// Inicia sesión en firebase con Google
export const loginWidthGoogle = () => {
  return (dispatch) => {
    firebase
      .auth()
      .signInWithPopup(googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName, user.email));
      });
  };
};

// Inicia sesión en la app, establece el estado de la app
export const login = (uid, displayName, email) => {
  let rol;

  switch (displayName) {
    case "Admin":
      rol = "admin";
      break;

    case "Bodega":
      rol = "bodega";
      break;

    case "Cajero":
      rol = "cajero";
      break;

    default:
      rol = "user";
      break;
  }

  return {
    type: TYPES.login,
    payload: { uid, displayName, email, rol },
  };
};
//#endregion Login

//#region Register
// Se registra en firebase con Email y Password
export const registerEmailPasswordName = (email, password, name) => {
  return (dispatch) => {
    dispatch(startLoading());

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(async ({ user }) => {
        /* INFO: Actualiza el displayName del usuario, ya que al momento de
        crearlo no se le asigna uno por defecto */
        await user.updateProfile({ displayName: name });

        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        dispatch(finishLoading());
        dispatch(showError(error.message));
        Swal.fire("Error", error.message, "error");
      });
  };
};
//#endregion Register

//#region Logout
// Se cierra sesión en firebase
export const startLogout = () => {
  return async (dispatch) => {
    dispatch(startLoading());

    await firebase.auth().signOut();

    dispatch(logout());
    dispatch(notesLogout());
    dispatch(finishLoading());
  };
};

// Se cierra sesión en la app, establece el estado de la app
const logout = () => ({
  type: TYPES.logout,
});
//#endregion Logout
