
import { Router, Route, Link, hashHistory } from 'react-router';
import { Tabs, Tab } from 'react-tab-view'
var TabComponent = require( '../components/tabs.js' );
import React, { Component, PropTypes } from 'react'
var STATES = require( '../components/data/states' );
import ReactPaginate from 'react-paginate';
var moment = require( 'moment' );

var BookingDetailsScreen = React.createClass( {
  getInitialState: function () {
    return {
      name: '',
      bookable_pattern: [],
      discounted_price: 0,
      no_of_people: 0,
      discount_amount: 0,
      discount_code: '',
      variant: {
        sub_variant: {
          name: ''
        }
      },
      tax_amount: 0,
      inventory_count: 0,
      amount: 0,
      bookingid: '',
      customerName: '',
      time: '',
      place: '',
      pickup_place: '',
      dot: '',
      email: '',
      phone: ''


    }
  },
  getNumberOfPassenger: function () {
    for (var key in this.state.inventory_info) {
      this.setState( {
        inventory_count: this.state.inventory_info[ key ].inventory_count
      } );

    }
  },
  componentDidMount: function () {
    console.log( this.props.params.bookingid );
    var self = this;
    var urlparams = {


    }
    var data = {}
    var clientInfo = this.props.route.config().getClientInfo();
    var header = {
      'X-Thrill-Client-Id': clientInfo.client_id,
      'X-Thrill-Auth-Token': clientInfo.auth_token
    }

    this.props.route.config().httpInterceptor( this.props.route.config().url().BOOKINGS_DETAILS + this.props.params.bookingid, 'GET', data, header, urlparams ).then(
      function ( result ) {
        self.setState( {
          name: result.tour.name,
          bookable_pattern: result.variant.bookable_patterns.join( ', ' ),
          discounted_price: result.variant.sub_variant.fixed_pricings[ 0 ].discounted_price,
          no_of_people: result.no_of_people,
          discount_amount: result.discount_amount,
          tax_amount: result.tax_amount,
          inventory_info: result.inventory_info,
          discount_code: result.discount_code,
          variant: result.variant,
          amount: result.amount,
          bookingid: result.transaction_id,
          customerName: result.first_name + ' ' + result.last_name,
          time: '',
          place: '',
          pickup_place: (result.pickup_location) ? result.pickup_location.name : 'N/A',
          dot: result.date_of_travel,
          email: result.email,
          phone: result.phone

        } );
        self.getNumberOfPassenger();
        console.log( result );

      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.route.notification._addNotification( window.event, 'error', message.message );
      } );
  },
  render: function () {
    console.log( this.state.variant.sub_variant )
    return (
    <div>
      <div className="page-body grey2">
        <div className="container">
          <ol className="breadcrumb">
            <li>
              <img src="images/icon-home.png" /><a href="/#/dashboard">Dashboard</a>
            </li>
            <li className="active">
              Bookings
            </li>
          </ol>
        </div>
      </div>
      <div className="page-body">
        <div className="container">
          <div className="ticket-preview">
            <div className="ticket">
              <div className="bar">
                <p>
                  Booking Voucher
                </p>
                <img src="images/watermark.png" />
              </div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <div className="details1">
                        <h3>{ this.state.name }</h3>
                        <p>
                          { this.state.variant.name + ' - ' + this.state.variant.sub_variant.name }
                        </p>
                        <hr />
                        <h4>Booked By</h4>
                        <p>
                          Name :
                          { this.state.customerName }
                        </p>
                        <div className="block col">
                          <div>
                            <div className="left">
                              <p>
                                Passengers
                              </p>
                              <p>
                                { this.state.inventory_count } x <i className="fa fa-inr"></i>
                                { this.state.discounted_price }
                              </p>
                            </div>
                            <div className="right">
                              <p>
                                <i aria-hidden="true" className="fa fa-inr"></i>
                                { this.state.no_of_people * this.state.discounted_price }
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className="left">
                              <p>
                                Discount
                                { (this.state.discount_code) ? '(' + this.state.discount_code + ')' : '' }
                              </p>
                            </div>
                            <div className="right">
                              <p>
                                - <i aria-hidden="true" className="fa fa-inr"></i>
                                { this.state.discount_amount }
                              </p>
                            </div>
                          </div>
                          <div>
                            <div className="left">
                              <p>
                                Tax
                              </p>
                            </div>
                            <div className="right">
                              <p>
                                <i aria-hidden="true" className="fa fa-inr"></i>
                                { this.state.tax_amount }
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="block col grand-total">
                          <div>
                            <div className="right">
                              <p>
                                Total Price : <i aria-hidden="true" className="fa fa-inr"></i>
                                { this.state.amount }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="details2">
                        <p>
                          BOOKING ID
                        </p>
                        <h3>{ this.state.bookingid }</h3>
                        <p>
                          NAME
                        </p>
                        <h3>{ this.state.customerName }</h3>
                        <p>
                          CONTACT DETAILS
                        </p>
                        <h3>P: { this.state.phone }</h3>
                        <h3>E: { this.state.email }</h3>
                        <p>
                          DATE OF TRAVEL
                        </p>
                        <h3>{ moment( this.state.dot ).format( 'DD MMMM YYYY' ) }</h3>
                        <p>
                          Time
                        </p>
                        <h3>{ this.state.time || 'N/A' }</h3>
                        <p>
                          Pickup Place
                        </p>
                        <h3>{ this.state.pickup_place }</h3>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>




    );
  }

} );
module.exports = BookingDetailsScreen;
