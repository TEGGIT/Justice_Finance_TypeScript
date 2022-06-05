
import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
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