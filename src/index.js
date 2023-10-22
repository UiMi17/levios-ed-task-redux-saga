import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import {BrowserRouter} from "react-router-dom";
import App from "./App";
import "./i18n/config";
import {Provider} from "react-redux"
import {store} from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <BrowserRouter basename="levios-ed-task">
        <Provider store={store}><App/></Provider>
    </BrowserRouter>
);
