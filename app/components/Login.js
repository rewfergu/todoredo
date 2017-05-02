import React from 'react';
import Loading from './Loading';
import firebase from 'firebase';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: localStorage.todoredo || '',
      password: '',
      loading: false,
    }

    this.signIn = this.signIn.bind(this);
    this.guestLogin = this.guestLogin.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.forgot = this.forgot.bind(this);
    this.verifyEmail = this.verifyEmail.bind(this);
  }

  submitForm(e) {
   
  }

  signIn(e) {
    e.preventDefault();
    this.setState({ loading: true });
    //this.props.sendUserData(this.state.email, this.state.password);
    localStorage.todoredo = this.state.email;

    const username = this.state.email;
    const password = this.state.password;
    const _this = this;
    // console.log('login', username, password);

    firebase.auth().signInWithEmailAndPassword(username, password)
      .then((user) => {
        _this.props.loadUserData(user);
      })
      .catch((error) => {
        _this.setState({ loading: false });
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, ': ', errorMessage);
        alert ('Error: ' + errorMessage);
      });
  }

  handleEmailChange(e) {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value
    })
  }

  toggleSecondaryAction(e) {
    e.preventDefault();
    document.getElementById('secondaryActionMenu').classList.toggle('active');
  }

  guestLogin(e) {
    e.preventDefault();
    const _this = this;
    this.setState({ loading: true });
    firebase.auth().signInWithEmailAndPassword('test@test.test', 'testing')
      .then((user) => {
        _this.props.loadUserData(user);
      })
      .catch((error) => {
        _this.setState({ loading: false });
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode, ': ', errorMessage);
        alert ('Error: ' + errorMessage);
      });
  }

  signUp(e) {
    e.preventDefault();

    const _this = this;
    const email = this.state.email;
    const password = this.state.password;

    if (email.length < 4) {
      alert('Please enter an email address.');
      return;
    }

    if (password.length < 4) {
      alert('Please enter a password.');
      return;
    }
    
    // Sign in with email and pass.
    // [START createwithemail]
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function() {
      //console.log('current user', firebase.auth().currentUser);
      _this.verifyEmail();
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/weak-password') {
        alert('The password is too weak.');
      } else {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END createwithemail]
  }

  verifyEmail() {
    // [START sendemailverification]
    firebase.auth().currentUser.sendEmailVerification().then(function() {
      // Email Verification sent!
      // [START_EXCLUDE]
      alert('Email Verification Sent!');
      // [END_EXCLUDE]
    });
    // [END sendemailverification]
  }

  forgot() {
    var email = document.getElementById('email').value;
    // [START sendpasswordemail]
    firebase.auth().sendPasswordResetEmail(email).then(function() {
      // Password Reset Email Sent!
      // [START_EXCLUDE]
      alert('Password Reset Email Sent!');
      // [END_EXCLUDE]
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // [START_EXCLUDE]
      if (errorCode == 'auth/invalid-email') {
        alert(errorMessage);
      } else if (errorCode == 'auth/user-not-found') {
        alert(errorMessage);
      }
      console.log(error);
      // [END_EXCLUDE]
    });
    // [END sendpasswordemail];
  }

  render() {

    const output = this.state.loading ?
      <Loading />
      : 
      <fieldset className="login__inputWrap">
        <legend className="login__title">TodoRedo</legend>
        <input required type="email" id="email" className="login__inputField" value={this.state.email} onChange={this.handleEmailChange} placeholder="email"/>
        <input required type="password" id="password" className="login__inputField" value={this.state.password} onChange={this.handlePasswordChange} placeholder="password"/>

        <div className="actionGroup">

          <div className="buttonGroup">
            <button id="primaryAction" className="buttonGroup__primary" type="submit" onClick={this.signIn}>Log In</button>
            <button id="secondaryAction" className="buttonGroup__secondary" onClick={this.toggleSecondaryAction}>
              <i className="fa fa-angle-down"></i>
            </button>
          </div>

          <div id="secondaryActionMenu" className="secondaryActions login__extras">
            <button className="secondaryActions__button login__guest" onClick={this.guestLogin}>
              <span>Log In As Guest</span>
              <i className="fa fa-angle-right"></i>
            </button>
            <button className="secondaryActions__button login__signup" onClick={this.signUp}>
              <span>Sign Up</span>
              <i className="fa fa-angle-right"></i>
            </button>
            <button className="secondaryActions__button login__forgot" onClick={this.forgot}>
              <span>Forgot My Password</span>
              <i className="fa fa-angle-right"></i>
            </button>
          </div>

        </div>







      </fieldset>;

    return (
      <form className="login">
        { output }
      </form>
    );
  }
}
