import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HashRouter, Redirect, Switch } from "react-router-dom";
import { login } from "../actions/auth";
import { getNotes } from "../actions/notes";
import { getAllProducts } from "../actions/products";
import { JournalScreen } from "../components/journal/JournalScreen";
import { Loading } from "../components/loading/Loading";
import { firebase } from "../firebase/firebaseConfig";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  //#region Redux
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);
  //#endregion Redux

  // #region States
  const [ready, setReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  //#endregion States

  //#region Effect
  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // verifica si contiene un usuario
      if (user?.uid) {
        console.log('USER', user.email)
        setIsLogged(true);
        dispatch(login(user.uid, user.displayName));

        dispatch(getNotes(user.uid));
        dispatch(getAllProducts());
      } else setIsLogged(false);
      setReady(true);
    });
  }, []);
  //#endregion Effect

  if (!ready) return <Loading />;

  return (
    <HashRouter>
      <div className={'Engel'}>
        {/* loading para mostrar en cualquier pantalla */}
        {loading && <Loading />}
        <Switch>
          <PublicRoute
            path={"/auth"}
            isAuthenticate={isLogged}
            component={AuthRouter}
          />
          <PrivateRoute
            exact
            path={"/"}
            isAuthenticate={isLogged}
            component={JournalScreen}
          />

          {/* REDIRECT TO LOGIN */}
          <Redirect to={"/"} />
        </Switch>
      </div>
    </HashRouter>
  );
};
