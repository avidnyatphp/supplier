var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var Input = require( '../components/Input.js' );
var _ = require( 'underscore' );
var Select = require( '../components/Select' );
var STATES = require( '../components/data/states' );
var Icon = require( '../components/Icon.js' );
var VendorProfile = React.createClass( {
  mixins: [ ConfigMixin ],
  getInitialState: function () {
    console.log( this.props.data.photo );
    return {
      photo: '',
      name: '',

      phone: '',
      email: '',
      description: ''
    }
  },
   validateEmail: function ( event ) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( event );
  },
  validatePhone: function ( event ) {
    // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
    var re = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g;
    return re.test( event );
  },
  isEmpty: function (value) {
    return !_.isEmpty(value);
  },
  showEdit: function () {

    this.setState( {
      photo: $( '#photo' ).prop( 'src' ),
      name: $( '#name' ).html(),

      phone: $( '#phone' ).html(),
      email: $( '#email' ).html(),
      description: $( '#description' ).html()
    } );
    $( '.vendor-profile.actual' ).addClass( 'hide' );
    $( '.vendor-profile.edit' ).removeClass( 'hide' );
    $( '.vendor-profile.edit' ).addClass( '\'animated bounceInLeft\'' );


  },
  updateName: function ( e ) {


    this.setState( {
      name: e.target.value
    } );
  },
  updateEmail: function ( e ) {


    this.setState( {
      email: e.target.value
    } );
  },
  updatePhone: function ( e ) {


    this.setState( {
      phone: e.target.value
    } );
  },
  updateDescription: function ( e ) {


    this.setState( {
      description: e.target.value
    } );
  },
  componentDidMount: function () {
    console.log( this.props );

    $( '.vendor-profile.actual' ).addClass( 'animated bounceInLeft' );
    $( '.vendor-profile.edit' ).addClass( '\'animated bounceInLeft\'' );

  },
  showActual: function () {
    $( '.vendor-profile.actual' ).removeClass( 'hide' );
    $( '.vendor-profile.edit' ).addClass( 'hide' );
  },
  save: function () {


var canProceed = this.validateEmail( this.state.email ) && this.isEmpty(this.state.name)
    && this.validatePhone(this.state.phone);

    if ( canProceed ) {
       var data = {
      profile: {
        name: this.state.name,
        phone1: this.state.phone,
        email: this.state.email,
        description: this.state.description
      }
    }
    var header = {
    }
    var clientInfo = this.utils().getClientInfo();
    var self = this;
    this.utils().httpInterceptor( this.utils().url().PROFILE_SAVE, 'PUT', data, header, clientInfo ).then(
      function ( result ) {
        $( '#name' ).html( self.state.name );
        $( '#email' ).html( self.state.email );
        $( '#phone' ).html( self.state.phone );
        $( '#description' ).html( self.state.description );
        $( '.vendor-profile.actual' ).removeClass( 'hide' );
        $( '.vendor-profile.edit' ).addClass( 'hide' );
        self.props.config.notification._addNotification(window.event, "success", "Updated details successfully!!!");
      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        console.log( message );
        self.props.config.notification._addNotification(window.event, "error", "Unable to save!!!");
      } );

    } else {

      this.refs.email.isValid();
      this.refs.phone.isValid();
      this.refs.name.isValid();

    }





   

  },
  render: function () {
    return (
    <div>
      <div className="vendor-profile actual">
        <div className="profile">
          <div className="pic">
            <img src={ this.props.data.photo } id="photo" />
          </div>
        </div>
        <div className="profile-details">
          <h4 id="name">{ this.props.data.name }</h4>
          <p>
            <strong>Phone:</strong> <span id="phone">{ this.props.data.phone1 }</span> &nbsp;&nbsp;&nbsp; <strong>Email: </strong>
            <a href={ 'mailto:' + this.props.data.email } id="email">
              { this.props.data.email }
            </a>
          </p>
          <h4>Basic Info</h4>
          <p id="description">
            { this.props.data.description }
          </p>
          <button className="btn btn-line btn-secondary" onClick={ this.showEdit }>
            Edit Profile
          </button>
        </div>
      </div>
      <div className="vendor-profile edit hide">
        <div className="profile">
          <div className="pic">
            <img src={ this.state.photo } />
          </div>
        </div>
        <div className="profile-details">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-field">
                <div className="field-name">
                  Vendor Name
                </div>
                
                       <Input text=""
                         ref="name"
                         type="text"
                         maxLength="20"
                         fieldName="name"
                         validate={ this.isEmpty}
                         defaultValue={ this.state.name }
                         value={ this.state.name }
                         onChange={ this.updateName }
                         emptyMessage="Name can't be empty"
                         errorVisible={ this.state.showEmailError } />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
              <div className="form-field">
                <div className="field-name">
                  Email
                </div>
                 <Input text=""
                         ref="email"
                         type="text"
                         tabIndex="1"
                         maxLength="100"
                         class="profile-email"
                         defaultValue={ this.state.email }
                         validate={ this.validateEmail }
                         value={ this.state.email }
                         onChange={ this.updateEmail }
                         errorMessage="Email is invalid"
                         emptyMessage="Email can't be empty"
                         errorVisible={ this.state.showEmailError } />
                
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-field">
                <div className="field-name">
                  Phone
                </div>
                
                       <Input text=""
                         ref="phone"
                         type="text"
                         tabIndex="1"
                         class="profile-email"
                         maxLength="20"
                         defaultValue={ this.state.phone }
                         validate={ this.validatePhone}
                         value={ this.state.phone }
                         onChange={ this.updatePhone }
                         errorMessage="Phone number is invalid"
                         emptyMessage="Phone number can't be empty"
                         errorVisible={ this.state.showEmailError } />
              </div>
            </div>
          </div>
          <div className="form-field">
            <div className="field-name">
              Basic Info
            </div>
            <textarea value={ this.state.description } onChange={ this.updateDescription } maxLength="200"></textarea>
          </div>
          <button className="btn btn-secondary" onClick={ this.save }>
            Update
          </button>
          <button className="btn btn-cancel" onClick={ this.showActual }>
            Cancel
          </button>
        </div>
      </div>
    </div>

    );
  }

} );

module.exports = VendorProfile;
