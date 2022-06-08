import React from 'react';

import {Route, Routes, Navigate} from 'react-router-dom'

import {useTypedSelector} from "../../hooks/useTypesSelector";

import {privateRoutes, publicRoutes} from "../router";

const AppRouter = () => {

  const auth = useTypedSelector((state) => state.auth);

  return (
    <Routes>
      {auth
        ? (
          <>
            {privateRoutes.map((route, index) =>
              <>
                <Route
                  key={index}
                  element={route.element}
                  path={route.path}
                />
              </>
            )}
          </>
        )
        : (
          <>
            {publicRoutes.map((route, index) =>
              <Route
                key={index}
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