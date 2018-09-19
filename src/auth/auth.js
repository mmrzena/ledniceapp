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

                {/* <button className='authBtn' id='signup' ref='signup' onClick={this.signUp.bind(this)}>
                Sign Up
                </button> */}

                
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

//   signUp(){
//     const email = this.refs.email.value;
//     const pass = this.refs.password.value;
//     const auth = firebase.auth();

//     const promise = auth.createUserWithEmailAndPassword(email, pass);
//     promise.catch(e => console.log(e.message));

//     this.refs.email.value = '';
//     this.refs.password.value = '';
//   }


}  

export default Login;
