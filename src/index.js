import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
import { StyledEngineProvider } from "@mui/material/styles";

import "./index.css";

import App from "./App";

const store = createStore(reducers, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <StyledEngineProvider injectFirst>
    <Provider store={store}>
      <App />
    </Provider>
  </StyledEngineProvider>,
  document.getElementById("root")
);
