import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Redirect, Switch } from "react-router-dom";
import { login } from "../actions/auth";
import { getNotes, setNotes } from "../actions/notes";
import { JournalScreen } from "../components/journal/JournalScreen";
import { Loading } from "../components/loading/Loading";
import { firebase } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.ui);

  const [ready, setReady] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      // verifica si contiene un usuario
      if (user?.uid) {
        setIsLogged(true);
        dispatch(login(user.uid, user.displayName));

        dispatch(getNotes(user.uid));
      } else setIsLogged(false);
      setReady(true);
    });
  }, []);

  if (!ready) return <Loading />;

  return (
    <Router>
      <div>
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
          <Redirect to={"/auth/login"} />
        </Switch>
      </div>
    </Router>
  );
};
