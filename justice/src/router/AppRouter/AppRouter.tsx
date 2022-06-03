
// @ts-ignore
import React, {Route, Routes, Navigate} from 'react';

import {privateRoutes, publicRoutes} from "../router";

const AppRouter = () => {
    const test = true
    return (
        <Routes>
            {test
        ? (
          <>
             {privateRoutes.map((route) =>
              <Route
                key={route.path}
                 element={route.element}
                 path={route.path}
                 exact={route.exact}
               />
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
                 exact={route.exact}
               />
             )}
           </>
         )}
       <Route
         path="*"
         element={<Navigate to="/" replace/>}
       />
     </Routes>
    );
};

export default AppRouter;