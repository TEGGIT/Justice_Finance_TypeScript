import React, {useEffect, useState} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import {privateRoutes, publicRoutes} from "../router";
import {useTypedSelector} from "../../hooks/useTypesSelector";

const AppRouter = () => {

  const auth = useTypedSelector((state) => state.auth);

  return (
    <Routes>
      {auth
        ? (
          <>
            {privateRoutes.map((route) =>
              <>
                <Route
                  key={route.path}
                  element={route.element}
                  path={route.path}
                />
              </>
            )}
          </>
        )
        : (
          <>
            {publicRoutes.map((route) =>
              <Route
                key={route.path}
                element={route.element}
                path={route.path}
              />
            )}
          </>
        )}
      <Route
        path="*"
        element={<Navigate to="/" replace={true}/>}
      />
    </Routes>
  );
};

export default AppRouter;