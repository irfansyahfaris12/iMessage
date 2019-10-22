import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from "../src/component/root/Root";
import * as serviceWorker from './serviceWorker';
import { myFirebase } from "../src/config/myFirebase";

console.log(myFirebase);

ReactDOM.render(<Root />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
