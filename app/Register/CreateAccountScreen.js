var React = require( 'react' );
var Input = require( '../components/Input.js' );
var _ = require( 'underscore' );
var Select = require( '../components/Select' );
var STATES = require( '../components/data/states' );
var Icon = require( '../components/Icon.js' );

import { Router, Route, Link, hashHistory } from 'react-router';

var CreateAccountScreen = React.createClass( {
  getInitialState: function () {
    return {
      yourName: null,
      phonenumber: null,

      passwordType: 'password',
      email: null,
      companyName: null,
      password: null,
      statesValue: null,
      forbiddenWords: [ 'password', 'user', 'username' ],
      registerFlag: 'hide',
      loginFlag: 'show'
    }
  },
  componentDidMount: function () {
    $( 'body' ).addClass( 'before-login' );
    $( '.form-animate' ).addClass( 'animated bounceInLeft' );
    $( '.login-text' ).addClass( 'animated bounceInRight' );
    this.setState( {
      actionText: '',
      action: 'Login Now'
    } );
  },
  handlePasswordInput: function ( event ) {
    this.setState( {
      password: event.target.value
    } );
  },



  saveAndContinue: function ( e ) {
    e.preventDefault();
    this.props.route.notification.showLogin();
    var canProceed = this.validateEmail( this.state.email )
    && this.refs.password.isValid();

    if ( canProceed ) {
      var data = {
        email: this.state.email
      }
      var self = this;
      var data = {
        'vendor': {
          'name': this.state.yourName,
          'email': this.state.email,
          'password': this.state.password,
          'phone1': this.state.phonenumber,
          'company_name': this.state.companyName,
          'company_website': this.state.companyWebsite
        }
      }
      this.props.route.config().httpInterceptor( this.props.route.config().url().CREATE_ACCOUNT, 'POST', data ).then(
        function ( result ) {
          self.props.route.notification._addNotification( e, 'success', 'Successfully registered !!!' );
          window.location.href = '/#/thank-you';
        },
        function ( result ) {
          let message = JSON.parse( result.responseText );
          self.props.route.notification._addNotification( e, 'error', message.message );
        }
      );


    } else {
      this.refs.yourName.isValid();
      this.refs.phonenumber.isValid();
      this.refs.email.isValid();
      this.refs.companyName.isValid();
      this.refs.password.isValid();

    }
  },


  handleCompanyInput: function ( event ) {
    this.setState( {
      companyName: event.target.value
    } )
  },
  handleNameInput: function ( event ) {
    this.setState( {
      yourName: event.target.value
    } )
  },
  handlephoneInput: function ( event ) {
    this.setState( {
      phonenumber: event.target.value
    } )
  },
  handleEmailInput: function ( event ) {
    this.setState( {
      email: event.target.value
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


    <div className="application_wrapper">
      <div className="page-body grey2">
        <div className="container text-center login-text">
          <h2>Secure your listing by <span className="secondary">creating an account!</span></h2>
          <p>
            Thrillophilia helps you market your products to millions of its customers!
          </p>
        </div>
      </div>
      <div className="page-body bg-img">
        <div className="container">
          <div className="register">
            <div className="row">
              <div className="col-sm-3">
              </div>
              <div className="col-sm-6 form-animate">
                <form onSubmit={ this.saveAndContinue }>
                  <div className="form">
                    <div className="form-field">
                      <i className="icon"><img src="images/icon-profile.png" /></i>
                      <Input text="Your Name"
                             ref="yourName"
                             validate={ this.isEmpty }
                             value={ this.state.yourName }
                             onChange={ this.handleNameInput }
                             emptyMessage="Your name can't be empty" />
                    </div>
                    <div className="form-field">
                      <i className="icon"><img src="images/icon-phone2.png" /></i>
                      <Input text="Phone Number"
                             ref="phonenumber"
                             validate={ this.isEmpty }
                             value={ this.state.phonenumber }
                             onChange={ this.handlephoneInput }
                             emptyMessage="Phone number can't be empty" />
                    </div>
                    <div className="form-field">
                      <i className="icon"><img src="images/icon-email.png" /></i>
                      <Input text="Email Address"
                             ref="email"
                             type="text"
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
                      <i className="icon view-pw" onClick={ this.showHidePassword }><img src="images/icon-view-pw.png" /></i>
                      <Input text="Create Password"
                             type={ this.state.passwordType }
                             ref="password"
                             validator="true"
                             minCharacters="6"
                             requireNumbers="1"
                             forbiddenWords={ this.state.forbiddenWords }
                             value={ this.state.password }
                             emptyMessage="Password is invalid"
                             onChange={ this.handlePasswordInput } />
                    </div>
                    <div className="form-field">
                      <i className="icon"><img src="images/icon-company.png" /></i>
                      <Input text="Company Name"
                             ref="companyName"
                             validate={ this.isEmpty }
                             value={ this.state.companyName }
                             onChange={ this.handleCompanyInput }
                             emptyMessage="Company name can't be empty" />
                    </div>
                    <div className="form-field">
                      <i className="icon"><img src="images/icon-web.png" /></i>
                      <Input text="Company Website"
                             ref="companyWebiste"
                             value={ this.state.companyWebsite }
                             onChange={ this.handleCompanyWebsiteInput } />
                    </div>
                    <button type="submit" className="btn btn-secondary btn-block">
                      Create an Account
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-sm-3">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
  }

} );

module.exports = CreateAccountScreen;
