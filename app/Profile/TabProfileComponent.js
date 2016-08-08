import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
var VendorProfile = require( './VendorProfile.js' );
var DetailsProfile = require( './DetailsProfile.js' );
var ContactInfoProfile = require( './ContactInfoProfile.js' );
var BankDetailsProfile = require( './BankDetailsProfile.js' );

var TabProfileComponent = React.createClass( {
  getInitialState: function () {
    console.log( this.props.profile );
    return {
      profile: {}
    }
  },
  componentDidMount: function () {

    console.log( this.props.profile );


  },
  render: function () {

    return (
    <div>
      <Tabs headers={ this.props.headers }>
        <Tab>
          <VendorProfile data={ this.props.profile } config={this.props.config}/>
        </Tab>
        <Tab>
          <DetailsProfile profile={ this.props.profile } config={this.props.config}/>
        </Tab>
        <Tab>
          <ContactInfoProfile profile={ this.props.profile }
                              countries={ this.props.countries }
                              bank_details={ this.props.profile.bank_detail } />
        </Tab>
        <Tab>
          <BankDetailsProfile profile={ this.props.profile } config={this.props.config}/>
        </Tab>
      </Tabs>
    </div>
    )
  }
} );



module.exports = TabProfileComponent;
