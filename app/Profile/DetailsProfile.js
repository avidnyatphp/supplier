var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var moment = require( 'moment' );
var DetailsProfile = React.createClass( {
  mixins: [ ConfigMixin ],
  getInitialState: function () {
    return {
      gender: '',
      companyName: '',
      companyWebsite: '',
    }
  },
  componentDidMount: function () {


    $( '.details-profile' ).addClass( 'animated bounceInRight' );
    $( '.details' ).hide();
    console.log( '>>>>>>' + $( '#company_name' ).html() );
    $( document ).on( 'click', '.dropdown-menu li', function ( e ) {

      $( e.target ).parents( '.dropdown' ).find( '.selection' ).text( $( this ).text() );
      $( e.target ).parents( '.dropdown' ).find( '.selection' ).val( $( this ).text() );

    } );
    var self = this;
    setTimeout( function () {}, 100 );
  },
  showActual: function () {
    $( '.details-section' ).removeClass( 'hide' );
    $( '.details-section-edit' ).addClass( 'hide' );
  },
  updateCompanyName: function ( e ) {
    this.setState( {
      companyName: e.target.value
    } );
  },
  updateCompanyWebsite: function ( e ) {
    this.setState( {
      companyWebsite: e.target.value
    } );
  },
  showEdit: function () {
    this.setState( {
      gender: ($( '#gender' ).html() == 'Not Available') ? '' : $( '#gender' ).html(),
      companyName: $( '#company_name' ).html(),
      companyWebsite: $( '#company_website' ).html()

    } );
    $( '.details-section' ).addClass( 'hide' );
    $( '.details-section-edit' ).removeClass( 'hide' );
  },
  save: function () {
    var data = {
      profile: {
        gender: $( '.selection' ).html(),
        company_name: this.state.companyName,
        company_website: this.state.companyWebsite
      }
    }
    var header = {
    }
    var clientInfo = this.utils().getClientInfo();
    var self = this;
    this.utils().httpInterceptor( this.utils().url().PROFILE_SAVE, 'PUT', data, header, clientInfo ).then(
      function ( result ) {
        $( '#gender' ).html( $( '.selection' ).html() );
        $( '#company_name' ).html( self.state.companyName );
        $( '#company_website' ).html( self.state.companyWebsite );

        $( '.details-section' ).removeClass( 'hide' );
        $( '.details-section-edit' ).addClass( 'hide' );
        self.props.config.notification._addNotification(window.event, "success", "Updated details successfully!!!");
      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
         self.props.config.notification._addNotification(window.event, "error", "Unable to save details!!!");
      } );

  },
  render: function () {
    return (
    <div>
      <div role="tabpanel"
           className="tab-pane details-profile"
           id="tabDetails2">
        <div className="details-section">
          <table>
            <tr>
              <td>
                Vendor Id
              </td>
              <td>
                { this.props.profile.id }
              </td>
            </tr>
            <tr>
              <td>
                Registration Date
              </td>
              <td>
                { moment( this.props.profile.registration_date ).format( 'MMM D, YYYY' ) }
              </td>
            </tr>
            <tr>
              <td>
                Gender
              </td>
              <td id="gender">
                { this.props.profile.gender || 'Not Available' }
              </td>
            </tr>
            <tr>
              <td>
                Company name
              </td>
              <td id="company_name">
                { this.props.profile.company_name || 'Not Available' }
              </td>
            </tr>
            <tr>
              <td>
                Website
              </td>
              <td id="company_website">
                { this.props.profile.company_website || 'Not Available' }
              </td>
            </tr>
          </table>
          <button className="btn btn-secondary btn-line" onClick={ this.showEdit }>
            Edit Details
          </button>
        </div>
        <div className="details-section-edit hide">
          <table>
            <tr>
              <td>
                Vendor Id
              </td>
              <td>
                { this.props.profile.id }
              </td>
            </tr>
            <tr>
              <td>
                Registration Date
              </td>
              <td>
                { moment( this.props.profile.registration_date ).format( 'MMM D, YYYY' ) }
              </td>
            </tr>
            <tr>
              <td>
                Gender
              </td>
              <td>
                <div className="dropdown">
                  <button className="btn dropdown-toggle"
                          type="button"
                          data-toggle="dropdown">
                    <span className="selection">{ this.state.gender || 'Choose' }</span>
                    <span className="glyphicon glyphicon-triangle-bottom"></span>
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      Male
                    </li>
                    <li>
                      Female
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                Company name
              </td>
              <td>
                <input type="text"
                       value={ this.state.companyName }
                       onChange={ this.updateCompanyName } maxLength="30"/>
              </td>
            </tr>
            <tr>
              <td>
                Website
              </td>
              <td>
                <input type="text"
                       value={ this.state.companyWebsite }
                       onChange={ this.updateCompanyWebsite } maxLength="150"/>
              </td>
            </tr>
          </table>
          <button className="btn btn-secondary btn-line" onClick={ this.save }>
            Update Details
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

module.exports = DetailsProfile;
