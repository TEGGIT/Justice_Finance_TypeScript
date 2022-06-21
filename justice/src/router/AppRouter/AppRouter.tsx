import React from "react";

import {Route, Routes, Navigate} from "react-router-dom";

import {useTypedSelector} from "../../hooks/useTypesSelector";

import {privateRoutes, publicRoutes} from "../router";

const AppRouter = () => {
  const {isAuth} = useTypedSelector((state) => state.auth);
  console.log(Boolean(isAuth))
  return (
    <Routes>
      {Boolean(isAuth) ? (
        <>
          {privateRoutes.map((route) => (
            <>
              <Route
                key={route.path}
                element={route.element}
                path={route.path}
              />
            </>
          ))}
        </>
      ) : (
        <>
          {publicRoutes.map((route) => (
            <Route key={route.path} element={route.element} path={route.path}/>
          ))}
        </>
      )}
      <Route path="*" element={<Navigate to="/"/>}/>
    </Routes>
  );
};

export default AppRouter;
