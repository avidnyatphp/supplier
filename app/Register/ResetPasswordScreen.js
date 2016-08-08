var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var Input = require( '../components/Input.js' );
var _ = require( 'underscore' );
var Select = require( '../components/Select' );
var STATES = require( '../components/data/states' );
var Icon = require( '../components/Icon.js' );
var ResetPasswordScreen = React.createClass( {
  getInitialState: function () {
    return {
      passwordType: 'password',
      resetEmail: '',
      password: '',
      passwordConfirmation: '',
      statesValue: '',
      forbiddenWords: [ 'password', 'user', 'username' ]
    }
  },
  handlePasswordInput: function ( event ) {
    this.setState( {
      password: event.target.value
    } );
  },
  handlePasswordConfirmationInput: function ( event ) {
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
          window.location.href = '/#/thank-you';
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
      <div className="page-body grey2">
        <div className="container text-center">
          <h2>Secure your <span className="secondary">listing by Login</span></h2>
          <p>
            Thrillophilia helps you market your products to millions of its customers!
          </p>
        </div>
      </div>
      <div className="page-body bg-img">
        <div className="reset-pw">
          <div className="container">
            <div className="form">
              <div className="form-field">
                <i className="icon"><img src="images/icon-email.png" /></i>
                <i className="icon view-pw"><img src="images/icon-view-pw.png" /></i>
                <input type="password" placeholder="New Password" />
              </div>
              <div className="form-field">
                <i className="icon"><img src="images/icon-password.png" /></i>
                <input type="password" placeholder="Confirm password" />
              </div>
              <button className="btn btn-secondary btn-block">
                Reset Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>






    );
  }

} );

module.exports = ResetPasswordScreen;
