import React from "react";
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "./rootReducer"; // Import your rootReducer from the correct path
import RouterDom from "./RouterDom";
import style from "./style.css"
const store = createStore(rootReducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterDom />
    </BrowserRouter>
  </Provider>
);
