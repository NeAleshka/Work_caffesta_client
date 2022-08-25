import React from 'react';
import {createRoot} from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter, HashRouter} from "react-router-dom";
import {Provider} from'react-redux'
import index from "./store";

//HashRouter для продакшена меняем на BrowserRouter,HashRouter для gp
const rootElement = document.getElementById('root') as HTMLElement;
const root = createRoot(rootElement) ;

root.render(
    <HashRouter>
          <Provider store={index}>
              <App/>
          </Provider>
      </HashRouter>
);


