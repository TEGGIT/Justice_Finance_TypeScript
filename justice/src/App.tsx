import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";


import AppRouter from "./router/AppRouter/AppRouter";

function App() {
  return (
    <div className="App">
     <BrowserRouter>
       <AppRouter/>
     </BrowserRouter>
    </div>
  );
}

export default App;
