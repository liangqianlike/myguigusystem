import React from "react";
import ReactDom from "react-dom";
import {Provider} from "react-redux";

import App from "./containers/App";
import store from './redux/store'

ReactDom.render(<App store={store} />, document.getElementById('root'));

store.subscribe(() => {
    ReactDom.render((
        <Provider store={store}>
            <App />
        </Provider>
    ), document.getElementById('root'));
});