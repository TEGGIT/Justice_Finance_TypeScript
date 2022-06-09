import React from "react";

import { Route, Routes, Navigate } from "react-router-dom";

import { useTypedSelector } from "../../hooks/useTypesSelector";

import { privateRoutes, publicRoutes } from "../router";

const AppRouter = () => {
  const auth = useTypedSelector((state) => state.auth);

  console.log(auth);
  return (
    <Routes>
      {auth ? (
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
            <Route key={route.path} element={route.element} path={route.path} />
          ))}
        </>
      )}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRouter;
