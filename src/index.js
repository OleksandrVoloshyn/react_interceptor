import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from "react-redux";
import {unstable_HistoryRouter as BrowserRouter} from "react-router-dom";

import {history} from './services/axios.service'
import {App} from './App';
import {store} from "./redux";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter history={history}>
                <App/>
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
);