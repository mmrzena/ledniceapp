import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './auth/auth.js';
import { firebase } from './firebase/firebase';

ReactDOM.render(<Login />, document.getElementById('root'));

let isLoggedIn = false;

const renderApp = (collection) => {
    if(isLoggedIn === true) {
        ReactDOM.render(<App collection={collection} />, document.getElementById('root'));
    }else {
        ReactDOM.render(<Login />, document.getElementById('root'));
    }
    
}

ReactDOM.render(<Login />, document.getElementById('root'));

firebase.auth().onAuthStateChanged(user => {
    if(user && !user.isAnonymous) {
        console.log('logged in')
        isLoggedIn = true;
        renderApp('items')
    } else if (user && user.isAnonymous){
        console.log('logged in as a guest')
        isLoggedIn = true;
        renderApp('guest')
    }
    else {
        isLoggedIn = false;
        console.log('not logged in')
        renderApp()    
    }
    })
