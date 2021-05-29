import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import DepartmentApp from './department-app';
import store from "./store/store";
import "./styles/styles.less"
import './i18n';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <DepartmentApp/>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
