var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var ContactInfoProfile = React.createClass( {
  mixins: [ ConfigMixin ],
  getInitialState: function () {
    return {
      country: {},
      city: {},
      states: [],
      cities: [],
      countryId: '',
      stateId: '',
      cityId: ''
    }
  },
  showEdit: function () {
    // this.setState({
    //   gender: ($("#gender").html() == "Not Available")?"":$("#gender").html(),
    //   companyName: $("#company_name").html(),
    //   companyWebsite: $("#company_website").html()

    // });
    $( '#sEmailTxt' ).val( $( '#sEmail' ).text() );
    $( '#sPhoneTxt' ).val( $( '#sPhone' ).text() );
    $( '#address1Txt' ).val( $( '#address1' ).text() );
    $( '#address2Txt' ).val( $( '#address2' ).text() );
    $( '#assistNameTxt' ).val( $( '#assistName' ).text() );
    $( '#assistPhoneTxt' ).val( $( '#assistPhone' ).text() );
    $( '#assistEmailTxt' ).val( $( '#assistEmail' ).text() );
    $( '#zipcodeTxt' ).val( $( '#zipcode' ).text() );
    $( '.contact-details' ).addClass( 'hide' );
    $( '.contact-details-edit' ).removeClass( 'hide' );
  },
  componentDidMount: function () {
    $( '.contact-details' ).addClass( 'animated bounceInRight' );
    var self = this;


    $( document ).on( 'click', '.country-dropdown .dropdown-menu li', function ( e ) {

      $( e.target ).closest( '.dropdown' ).find( '.selection-country' ).text( $( e.target ).text() );
      $( e.target ).closest( '.dropdown' ).find( '.selection-country' ).val( $( e.target ).text() );
      $( e.target ).closest( '.dropdown' ).find( '.selection-country' ).prop( 'data-id', $( e.target ).data( 'id' ) );
      self.setState( {
        countryId: $( e.target ).data( 'id' )
      } );
      var data = {

      }
      var header = {
      }
      var clientInfo = self.utils().getClientInfo();
      clientInfo[ 'country_id' ] = parseInt( $( e.target ).data( 'id' ) );

      self.utils().httpInterceptor( self.utils().url().STATE, 'GET', data, header, clientInfo ).then(
        function ( result ) {
          self.setState( {
            states: result.states
          } );

        },
        function ( result ) {
          let message = JSON.parse( result.responseText );
          console.log( message );
          // self.props.config.notification._addNotification(window.event, "error", message.message);
        } );
    } );
    $( document ).on( 'click', '.state-dropdown .dropdown-menu li', function ( e ) {
      $( e.target ).closest( '.dropdown' ).find( '.selection-state' ).text( $( e.target ).text() );
      $( e.target ).closest( '.dropdown' ).find( '.selection-state' ).val( $( e.target ).text() );
      $( e.target ).closest( '.dropdown' ).find( '.selection-state' ).prop( 'data-id', $( e.target ).data( 'id' ) );
      self.setState( {
        stateId: $( e.target ).data( 'id' )
      } );
      var data = {

      }
      var header = {
      }
      var clientInfo = self.utils().getClientInfo();
      clientInfo[ 'country_id' ] = parseInt( $( '.selection-country' ).prop( 'data-id' ) );
      clientInfo[ 'state_id' ] = parseInt( $( e.target ).data( 'id' ) );


      self.utils().httpInterceptor( self.utils().url().CITIES, 'GET', data, header, clientInfo ).then(
        function ( result ) {
          self.setState( {
            cities: result.cities
          } );

        },
        function ( result ) {
          let message = JSON.parse( result.responseText );
          console.log( message );
          // self.props.config.notification._addNotification(window.event, "error", message.message);
        } );
    } );
    $( document ).on( 'click', '.city-dropdown .dropdown-menu li', function ( e ) {
      self.setState( {
        cityId: $( e.target ).data( 'id' )
      } );
      $( e.target ).closest( '.dropdown' ).find( '.selection-city' ).text( $( e.target ).text() );
      $( e.target ).closest( '.dropdown' ).find( '.selection-city' ).val( $( e.target ).text() );
      $( e.target ).closest( '.dropdown' ).find( '.selection-city' ).prop( 'data-id', $( e.target ).data( 'id' ) );
    } );

  },
  save: function () {
    var data = {
      profile: {
        country_id: this.state.countryId,
        city_id: this.state.cityId,
        state_id: this.state.stateId
      }
    }
    data.profile[ 'phone2' ] = $( '#sPhoneTxt' ).val();
    data.profile[ 'secondary_email' ] = $( '#sEmailTxt' ).val();
    data.profile[ 'address1' ] = $( '#address1Txt' ).val();
    data.profile[ 'address2' ] = $( '#address2Txt' ).val();
    data.profile[ 'postal_code' ] = $( '#zipcodeTxt' ).val();
    data.profile[ 'vendor_associates_attributes' ] = [ {
      name: $( '#assistNameTxt' ).val(),
      email: $( '#assistEmailTxt' ).val(),
      phone: $( '#assistPhoneTxt' ).val()
    } ]
    var header = {
    }
    var clientInfo = this.utils().getClientInfo();
    var self = this;
    this.utils().httpInterceptor( this.utils().url().PROFILE_SAVE, 'PUT', data, header, clientInfo ).then(
      function ( result ) {
        $( '.contact-details' ).removeClass( 'hide' );
        $( '.contact-details-edit' ).addClass( 'hide' );

      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        console.log( message );
       self.props.config.notification._addNotification(window.event, "error", JSON.stringify(result));
      } );

  },
  render: function () {
    var listCoutryItems = this.props.countries.map( function ( item ) {

      return (
      <li data-id={ item.id }>
        { item.name }
      </li>

      );
    } );
    var listStateItems = this.state.states.map( function ( item ) {

      return (
      <li data-id={ item.id }>
        { item.name }
      </li>

      );
    } );
    var listCitiesItems = this.state.cities.map( function ( item ) {

      return (
      <li data-id={ item.id }>
        { item.name }
      </li>

      );
    } );
    console.log( this.props.profile );
    // var assistName = this.props.profile.vendor_associates.map(function(item){
    //     return (
    //             <span>{item.name}</span>
    //         );
    // });
    // var assistPhone = this.props.profile.vendor_associates.map(function(item){
    //     return (
    //             <span>{item.phone}</span>
    //         );
    // });
    // var assistEmail = this.props.profile.vendor_associates.map(function(item){
    //     return (
    //             <span>{item.email}</span>
    //         );
    // });
    // this.setState({
    //   countryId: this.props.profile.country,
    //   stateId: this.props.profile.state
    // });
    return (
    <div role="tabpanel"
         className="tab-pane"
         id="tabContactInfo">
      <div className="contact-details">
        <table>
          <tr>
            <td>
              Email
            </td>
            <td>
              { this.props.profile.email }
            </td>
          </tr>
          <tr>
            <td>
              Secondary Email
            </td>
            <td id="sEmail">
              { this.props.profile.secondary_email }
            </td>
          </tr>
          <tr>
            <td>
              Phone
            </td>
            <td>
              { this.props.profile.phone1 }
            </td>
          </tr>
          <tr>
            <td>
              Secondary Phone
            </td>
            <td id="sPhone">
              { this.props.profile.phone2 }
            </td>
          </tr>
          <tr>
            <td>
              Address Line 1
            </td>
            <td id="address1">
              { this.props.profile.address1 }
            </td>
          </tr>
          <tr>
            <td>
              Address Line 2
            </td>
            <td id="address2">
              { this.props.profile.address2 }
            </td>
          </tr>
          <tr>
            <td>
              City/ Town
            </td>
            <td>
              { this.props.profile.city }
            </td>
          </tr>
          <tr>
            <td>
              State/ Province
            </td>
            <td>
              { this.props.profile.state }
            </td>
          </tr>
          <tr>
            <td>
              Zip/ Postal Code
            </td>
            <td id="zipcode">
              { this.props.profile.postal_code }
            </td>
          </tr>
          <tr>
            <td>
              Country
            </td>
            <td>
              { this.props.profile.country }
            </td>
          </tr>
          <tr>
            <td>
              Assistant Name
            </td>
            <td id="assistName">
              { this.props.profile.vendor_associates[ 0 ].name }
            </td>
          </tr>
          <tr>
            <td>
              Assistant Email
            </td>
            <td id="assistEmail">
              { this.props.profile.vendor_associates[ 0 ].email }
            </td>
          </tr>
          <tr>
            <td>
              Assistant Phone
            </td>
            <td id="assistPhone">
              { this.props.profile.vendor_associates[ 0 ].phone }
            </td>
          </tr>
        </table>
        <button className="btn btn-secondary btn-line" onClick={ this.showEdit }>
          Edit Contact Info
        </button>
      </div>
      <div className="contact-details-edit hide">
        <table>
          <tr>
            <td>
              Email
            </td>
            <td>
              email@gmail.com
            </td>
          </tr>
          <tr>
            <td>
              Secondary Email
            </td>
            <td>
              <input type="text" id="sEmailTxt" />
            </td>
          </tr>
          <tr>
            <td>
              Phone
            </td>
            <td>
              { this.props.profile.phone1 }
            </td>
          </tr>
          <tr>
            <td>
              Secondary Phone
            </td>
            <td>
              <input type="text" id="sPhoneTxt" />
            </td>
          </tr>
          <tr>
            <td>
              Address Line 1
            </td>
            <td>
              <input type="text" id="address1Txt" />
            </td>
          </tr>
          <tr>
            <td>
              Address Line 2
            </td>
            <td>
              <input type="text" id="address2Txt" />
            </td>
          </tr>
          <tr>
            <td>
              Country
            </td>
            <td>
              <div className="dropdown country-dropdown">
                <button className="btn dropdown-toggle"
                        type="button"
                        data-toggle="dropdown">
                  <span className="selection-country">{ this.props.profile.country || 'Choose' }</span>
                  <span className="glyphicon glyphicon-triangle-bottom"></span>
                </button>
                <ul className="dropdown-menu">
                  { listCoutryItems }
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              State/ Province
            </td>
            <td>
              <div className="dropdown state-dropdown">
                <button className="btn dropdown-toggle"
                        type="button"
                        data-toggle="dropdown">
                  <span className="selection-state">{ this.props.profile.state || 'Choose' }</span>
                  <span className="glyphicon glyphicon-triangle-bottom"></span>
                </button>
                <ul className="dropdown-menu">
                  { listStateItems }
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              City/ Town
            </td>
            <td>
              <div className="dropdown city-dropdown">
                <button className="btn dropdown-toggle"
                        type="button"
                        data-toggle="dropdown">
                  <span className="selection-city">{ this.props.profile.city || 'Choose' }</span>
                  <span className="glyphicon glyphicon-triangle-bottom"></span>
                </button>
                <ul className="dropdown-menu">
                  { listCitiesItems }
                </ul>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              Zip/ Postal Code
            </td>
            <td>
              <input type="text" id="zipcodeTxt" />
            </td>
          </tr>
          <tr>
            <td>
              Assistant Name
            </td>
            <td>
              <input type="text" id="assistNameTxt" />
            </td>
          </tr>
          <tr>
            <td>
              Assistant Email
            </td>
            <td>
              <input type="text" id="assistEmailTxt" />
            </td>
          </tr>
          <tr>
            <td>
              Assistant Phone
            </td>
            <td>
              <input type="text" id="assistPhoneTxt" />
            </td>
          </tr>
        </table>
        <button className="btn btn-secondary btn-line" onClick={ this.save }>
          Update Contact Info
        </button>
      </div>
    </div>



    );
  }

} );

module.exports = ContactInfoProfile;
