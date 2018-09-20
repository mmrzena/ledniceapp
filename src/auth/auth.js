import React, { Component } from 'react';
import '../style/App.css';
import { firebase } from '../firebase/firebase';

class Login extends Component {


  render() {
         return (
            <div className='authDiv'>
                
                <input className='authInput' ref='email' type='email' placeholder='Email'/>

                <input className='authInput' ref='password' type='password' placeholder='Password'/>
                <div className='authBtns'>
                <button className='authBtn' id="login" ref='login' onClick={this.login.bind(this)}>
                Login
                </button>

                <button className='authBtn' id='guest' ref='guest' onClick={this.guest.bind(this)}>
                As a Guest
                </button>
                
                </div>
            </div>

        )
    }
  

  login(){
      const email = this.refs.email.value;
      const pass = this.refs.password.value;
      const auth = firebase.auth();
      const promise = auth.signInWithEmailAndPassword(email, pass);
      promise.catch(e => console.log(e.message));
  }

  guest() {
      firebase.auth().signInAnonymously().catch(e => console.log(e.message));
  }

}  

export default Login;
