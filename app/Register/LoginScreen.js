var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var Input = require( '../components/Input.js' );
var _ = require( 'underscore' );
var Select = require( '../components/Select' );
var STATES = require( '../components/data/states' );
var Icon = require( '../components/Icon.js' );

var LoginScreen = React.createClass( {
  getInitialState: function () {
    return {
      passwordType: 'password',
      resetEmail: '',
      email: '',
      password: '',
      statesValue: '',
      forbiddenWords: [ 'password', 'user', 'username' ]
    }
  },
  componentDidMount: function () {
    if ( localStorage.getItem( 'clientInfo' ) ) {
      window.location.href = '/#/dashboard';
    }
    $( '#pageloader' ).fadeOut();
    $( 'body' ).addClass( 'before-login' );
    $( '.form' ).addClass( 'animated bounceInLeft' );
    $( '.login-text' ).addClass( 'animated bounceInRight' );

  },
  handlePasswordInput: function ( event ) {
    this.setState( {
      password: event.target.value
    } );
  },
  saveAndContinue: function ( e ) {
    e.preventDefault();

    var canProceed = this.validateEmail( this.state.email )
    && this.refs.password.isValid();

    if ( canProceed ) {
      var data = {
        email: this.state.email
      }
      var self = this;
      var data = {
        'email': this.state.email,
        'password': this.state.password

      }
      this.props.route.config().httpInterceptor( this.props.route.config().url().LOGIN, 'POST', data ).then(
        function ( result ) {
          self.props.route.notification._addNotification( e, 'success', 'Successfully login !!!' );
          localStorage.setItem( 'clientInfo', JSON.stringify( result ) );
          self.props.route.notification.login();
          console.log( JSON.parse( localStorage.getItem( 'clientInfo' ) ) );
          window.location.href = '/#/dashboard';
        },
        function ( result ) {
          let message = JSON.parse( result.responseText );
          self.props.route.notification._addNotification( e, 'error', message.message );
        }
      );


    } else {

      this.refs.email.isValid();
      this.refs.password.isValid();

    }
  },

  sendResetMail: function ( e ) {
    e.preventDefault();

    var canProceed = this.validateEmail( this.state.resetEmail );

    if ( canProceed ) {
      var data = {
        'vendor': {
          email: this.state.resetEmail
        }
      }
      var self = this;

      this.props.route.config().httpInterceptor( this.props.route.config().url().SEND_RESET_PASSWORD_EMAIL, 'POST', data ).then(
        function ( result ) {
          self.props.route.notification._addNotification( e, 'success', 'Successfully Email Sent !!!' );
          $( '#forgotPwModal' ).modal( 'hide' );
          //window.location.href="/#/thank-you";
        },
        function ( result ) {
          let message = JSON.parse( result.responseText );
          self.props.route.notification._addNotification( e, 'error', message.message );
        }
      );


    } else {

      this.refs.resetEmail.isValid();


    }
  },
  handleEmailInput: function ( event ) {
    this.setState( {
      email: event.target.value
    } );
  },
  handleResetEmailInput: function ( event ) {
    this.setState( {
      resetEmail: event.target.value
    } );
  },
  showHidePassword: function ( event ) {
    if ( this.state.passwordType == 'password' ) {
      this.setState( {
        passwordType: 'text'
      } );
    } else {
      this.setState( {
        passwordType: 'password'
      } );
    }


  },
  validateEmail: function ( event ) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( event );
  },

  isEmpty: function ( value ) {
    return !_.isEmpty( value );
  },

  updateStatesValue: function ( value ) {
    this.setState( {
      statesValue: value
    } )
  },

  render: function () {
    return (
    <div>
      <div id="pageloader">
        <div className="loader-inner">
          <img src="images/preloader-color.gif" alt="" />
        </div>
      </div>
      <div className="page-body grey2">
        <div className="container text-center login-text">
          <h2>Secure your <span className="secondary">listing by Login</span></h2>
          <p>
            Thrillophilia helps you market your products to millions of its customers!
          </p>
        </div>
      </div>
      <div className="page-body bg-img">
        <div className="login">
          <div className="container">
            <form onSubmit={ this.saveAndContinue }>
              <div className="form" data-appear-animation="bounceInLeft">
                <div className="form-field">
                  <i className="icon"><img src="images/icon-email.png" /></i>
                  <Input text="Email Address"
                         ref="email"
                         type="text"
                         tabIndex="1"
                         defaultValue={ this.state.email }
                         validate={ this.validateEmail }
                         value={ this.state.email }
                         onChange={ this.handleEmailInput }
                         errorMessage="Email is invalid"
                         emptyMessage="Email can't be empty"
                         errorVisible={ this.state.showEmailError } />
                </div>
                <div className="form-field">
                  <i className="icon"><img src="images/icon-password.png" /></i>
                  <i className="icon view-pw"><a href="javascript:void(0);" onClick={ this.showHidePassword }><img src="images/icon-view-pw.png" /></a></i>
                  <Input text="Password"
                         type={ this.state.passwordType }
                         ref="password"
                         tabIndex="2"
                         validate={ this.isEmpty }
                         forbiddenWords={ this.state.forbiddenWords }
                         value={ this.state.password }
                         emptyMessage="Password can't be empty"
                         onChange={ this.handlePasswordInput } />
                </div>
                <p className="text-right">
                  <a href="#"
                     data-toggle="modal"
                     data-target="#forgotPwModal">Forget Password?</a>
                </p>
                <button type="submit" className="btn btn-secondary btn-block">
                  Login
                </button>
                <p className="text-center reg-link">
                  Not registered yet? <a href="javascript:void(0);" onClick={ this.props.route.notification.showLogin }>Signup Here</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="modal forgot-pw-modal fade"
           id="forgotPwModal"
           tabindex="-1"
           role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body text-center">
              <button type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <div className="lock-img">
                <img src="images/lock.png" />
              </div>
              <h3>Reset Password</h3>
              <p>
                Please provide the email address that you used when you signed up for your account. We will send you an email that allow you to reset your password.
              </p>
              <form id="resetEmailSend">
                <div className="form">
                  <div className="form-field">
                    <i className="icon"><img src="images/icon-email.png" /></i>
                    <Input text="Email Address"
                           ref="resetEmail"
                           type="text"
                           defaultValue={ this.state.resetEmail }
                           validate={ this.validateEmail }
                           value={ this.state.resetEmail }
                           onChange={ this.handleResetEmailInput }
                           errorMessage="Email is invalid"
                           emptyMessage="Email can't be empty"
                           errorVisible={ this.state.showResetEmailError } />
                  </div>
                  <button onClick={ this.sendResetMail } className="btn btn-secondary btn-block">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>







    );
  }

} );

module.exports = LoginScreen;
