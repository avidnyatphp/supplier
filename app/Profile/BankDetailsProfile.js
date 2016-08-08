var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var BankDetailsProfile = React.createClass( {
  mixins: [ ConfigMixin ],
  getInitialState: function () {
    return {
      'name': '',
      'account_holder': '',
      'account_number': '',
      'branch_name': '',
      'ifsc': '',
      'iban': '',
      'swift_code': '',
      'pan_number': '',
      'service_tax_number': ''

    }
  },

  componentDidMount: function () {
    $( '.bank-details' ).addClass( 'animated bounceInRight' );
  },
  updateName: function ( e ) {
    this.setState(
      {
        name: e.target.value
      }
    );
  },
  updateAccHolder: function ( e ) {
    this.setState(
      {
        account_holder: e.target.value
      }
    );
  },
  updateAccNum: function ( e ) {
    this.setState(
      {
        account_number: e.target.value
      }
    );
  },

  updateBranchName: function ( e ) {
    this.setState(
      {
        branch_name: e.target.value
      }
    );
  },
  updateIfsc: function ( e ) {
    this.setState(
      {
        ifsc: e.target.value
      }
    );
  },
  updateIban: function ( e ) {
    this.setState(
      {
        iban: e.target.value
      }
    );
  },
  updateSwiftCode: function ( e ) {
    this.setState(
      {
        swift_code: e.target.value
      }
    );
  },
  updateServiceTaxNum: function ( e ) {
    this.setState(
      {
        service_tax_number: e.target.value
      }
    );
  },
  updatePan: function ( e ) {
    this.setState(
      {
        pan_number: e.target.value
      }
    );
  },
  save: function () {
    var data = {
      profile: {
        'bank_detail_attributes': {
          'name': $( '#nameTxt' ).val(),
          'account_holder': $( '#account_holderTxt' ).val(),
          'account_number': $( '#account_numberTxt' ).val(),
          'branch_name': $( '#branch_nameTxt' ).val(),
          'ifsc': $( '#ifscTxt' ).val(),
          'iban': $( '#ibanTxt' ).val(),
          'swift_code': $( '#swift_codeTxt' ).val(),
          'pan_number': $( '#pan_numberTxt' ).val(),
          'service_tax_number': $( '#service_tax_numberTxt' ).val()
        }
      }
    }

    var header = {
    }
    var clientInfo = this.utils().getClientInfo();
    var self = this;
    this.utils().httpInterceptor( this.utils().url().PROFILE_SAVE, 'PUT', data, header, clientInfo ).then(
      function ( result ) {
        $( '.bank-fields' ).each( function () {
          $( '#' + $( this ).prop( 'id' ).replace( /Txt/, '' ) + '1' ).html( $( '#' + $( this ).prop( 'id' ) ).val() );
        } );
        $( '.bank-details' ).removeClass( 'hide' );
        $( '.bank-details-edit' ).addClass( 'hide' );
        self.props.config.notification._addNotification(window.event, "success", "Updated details successfully!!!");
      },
      function ( result ) {
         self.props.config.notification._addNotification(window.event, "error", JSON.stringify(result));
      } );

  },
  showEdit: function () {
    var self = this;

    this.setState( {
      'name': $( '#name1' ).text(),
      'account_holder': $( '#account_holder1' ).text(),
      'account_number': $( '#account_number1' ).text(),
      'branch_name': $( '#branch_name1' ).text(),
      'ifsc': $( '#ifsc1' ).text(),
      'iban': $( '#iban1' ).text(),
      'swift_code': $( '#swift_code1' ).text(),
      'pan_number': $( '#pan_number1' ).text(),
      'service_tax_number': $( '#service_tax_number1' ).text()


    } );
    $( '.bank-details' ).addClass( 'hide' );
    $( '.bank-details-edit' ).removeClass( 'hide' );
  },
  render: function () {

    var bankKeyArray = [
      'name',
      'account_holder',
      'account_number',
      'branch_name',
      'ifsc',
      'iban',
      'swift_code',
      'pan_number',
      'service_tax_number'
    ]
    var bankValueArray = [
      'Bank Name',
      'Account Holder',
      'Account Number',
      'Branch',
      'IFSC',
      'IBAN',
      'Swift Code',
      'PAN',
      'Service Tax No'
    ]
    var bankName = '';
    var accountHolder = '';
    var accountNumber = '';
    var branch = '';
    var ifsc = '';
    var iban = '';
    var swiftCode = '';
    var pan = '';
    var serviceTaxNo = '';
    var self = this;
    var bankArray = bankKeyArray.map( function ( item ) {
      return (
      <tr>
        <td>
          { bankValueArray[ bankKeyArray.indexOf( item ) ] }
        </td>
        <td id={ item + '1' }>
          { self.props.profile.bank_detail[ item ] }
        </td>
      </tr>
      );
    } );

    return (
    <div>
      <div role="tabpanel"
           className="tab-pane"
           id="tabBankDetails">
        <div className="bank-details">
          <table>
            { bankArray }
          </table>
          <button className="btn btn-secondary btn-line" onClick={ this.showEdit }>
            Edit Bank Details
          </button>
        </div>
        <div className="bank-details-edit hide">
          <table>
            <tr>
              <td>
                Bank Name
              </td>
              <td>
                <input type="text"
                       id="nameTxt"
                       className="bank-fields"
                       value={ this.state.name }
                       onChange={ this.updateName } />
              </td>
            </tr>
            <tr>
              <td>
                Account Holder
              </td>
              <td>
                <input type="text"
                       id="account_holderTxt"
                       className="bank-fields"
                       value={ this.state.account_holder }
                       onChange={ this.updateAccHolder } />
              </td>
            </tr>
            <tr>
              <td>
                Account Number
              </td>
              <td>
                <input type="text"
                       id="account_numberTxt"
                       className="bank-fields"
                       value={ this.state.account_number }
                       onChange={ this.updateAccNum } />
              </td>
            </tr>
            <tr>
              <td>
                Branch
              </td>
              <td>
                <input type="text"
                       id="branch_nameTxt"
                       className="bank-fields"
                       value={ this.state.branch_name }
                       onChange={ this.updateBranchName } />
              </td>
            </tr>
            <tr>
              <td>
                IFSC
              </td>
              <td>
                <input type="text"
                       id="ifscTxt"
                       className="bank-fields"
                       value={ this.state.ifsc }
                       onChange={ this.updateIfsc } />
              </td>
            </tr>
            <tr>
              <td>
                IBAN
              </td>
              <td>
                <input type="text"
                       id="ibanTxt"
                       className="bank-fields"
                       value={ this.state.iban }
                       onChange={ this.updateIban } />
              </td>
            </tr>
            <tr>
              <td>
                Swift Code
              </td>
              <td>
                <input type="text"
                       id="swift_codeTxt"
                       className="bank-fields"
                       value={ this.state.swift_code }
                       onChange={ this.updateSwiftCode } />
              </td>
            </tr>
            <tr>
              <td>
                PAN
              </td>
              <td>
                <input type="text"
                       id="pan_numberTxt"
                       className="bank-fields"
                       value={ this.state.pan_number }
                       onChange={ this.updatePan } />
              </td>
            </tr>
            <tr>
              <td>
                Service Tax No
              </td>
              <td>
                <input type="text"
                       id="service_tax_numberTxt"
                       className="bank-fields"
                       value={ this.state.service_tax_number }
                       onChange={ this.updateServiceTaxNum } />
              </td>
            </tr>
          </table>
          <button className="btn btn-secondary btn-line" onClick={ this.save }>
            Update Bank Details
          </button>
        </div>
      </div>
    </div>
    );
  }

} );

module.exports = BankDetailsProfile;
