
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import App from './route'
import store from './store';

import 'antd/dist/antd.css'


import './css/style.scss';
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
