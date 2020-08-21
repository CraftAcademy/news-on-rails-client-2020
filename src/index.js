import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "./state/store/configureStore";
import "./i18n"
import { StripeProvider } from "react-stripe-elements"

let apiUrl;
if (process.env.NODE_ENV === "production") {
  apiUrl = "https://news-on-rails-api.herokuapp.com/api/v1";
} else {
  apiUrl = "http://localhost:3000/api/v1";
}
axios.defaults.baseURL = apiUrl;

const store = configureStore();
window.store = store;

ReactDOM.render(
  <Provider store={store}>
    <StripeProvider apiKey="pk_test_QicERB8w3kyqaYW3hUUQylRH">
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </StripeProvider>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();