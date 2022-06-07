import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";


import AppRouter from "./router/AppRouter/AppRouter";
import {Provider} from "react-redux";
import {store} from "./store";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <AppRouter/>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
