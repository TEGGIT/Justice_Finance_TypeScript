import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "../router";
import {useTypedSelector} from "../../hooks/useTypesSelector";

const AppRouter = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)

  const auth = useTypedSelector((state) => state.auth);

  useEffect(() => {
    setIsAuth(auth);
  }, [auth])
  return (
    <Routes>
      {isAuth
        ? (
          <>
            {privateRoutes.map((route) =>
              <>
                <Route
                  key={route.path}
                  element={route.element}
                  path={route.path}
                />
                <Route
                  path="*"
                  element={<Navigate to="/exchange-rates-page" replace={true}/>}
                />
              </>
            )}
          </>
        )
        : (
          <>
            {publicRoutes.map((route) =>
              <>
                <Route
                  key={route.path}
                  element={route.element}
                  path={route.path}
                />
                <Route
                  path="*"
                  element={<Navigate to="/" replace={true}/>}
                />
              </>
            )}
          </>
        )}

    </Routes>
  );
};

export default AppRouter;