import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { reducers } from './reducers';
import App from './App';
import './index.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Viewer, { Worker } from '@phuocng/react-pdf-viewer';
 
import '@phuocng/react-pdf-viewer/cjs/react-pdf-viewer.css';
const store = createStore(reducers, compose(applyMiddleware(thunk)));
 
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('root'));