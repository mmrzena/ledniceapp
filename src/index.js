import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './auth/auth.js';
import { firebase } from './firebase/firebase';

ReactDOM.render(<Login />, document.getElementById('root'));

let hasRendered = false;

const renderApp = () => {
    if(hasRendered === true) {
        ReactDOM.render(<App />, document.getElementById('root'));
    }else {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }
    
}

ReactDOM.render(<Login />, document.getElementById('root'));

firebase.auth().onAuthStateChanged(user => {
    if(user) {
        console.log('logged in')
        hasRendered = true;
        renderApp()
    } else {
        hasRendered = false;
        console.log('not logged in')
        renderApp()    
    }
    })
