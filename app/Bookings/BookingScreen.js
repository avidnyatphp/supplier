
import { Router, Route, Link, hashHistory } from 'react-router';
import { Tabs, Tab } from 'react-tab-view'
var TabBookingsComponent = require( './TabBookingsComponent.js' );
import React, { Component, PropTypes } from 'react'
var STATES = require( '../components/data/states' );
import ReactPaginate from 'react-paginate';

var BookingScreen = React.createClass( {
  getInitialState: function () {
    return {
      bookings: [],
      history: [],
      pageNum: 0,
      pageNumHistory: 0,
      pageSelected: 1,
      pageSelectedHistory: 1,
      contactNumber: '',
      modalName: '',
      tour: []
    }
  },
  getData: function ( from, to, tourId, tabSection ) {

    if ( tabSection == 'history' ) {
      var urlparams = {
        'page': 1,
        'per_page': 10,
        'history': 1
      }
    } else {
      var urlparams = {
        'page': 1,
        'per_page': 10,
        'history': 1
      }
    }
    if ( from != -1 ) {
      urlparams[ 'from' ] = from;
    }
    if ( to != -1 ) {
      urlparams[ 'to' ] = to;
    }
    if ( tourId != -1 ) {
      urlparams[ 'tour_id' ] = tourId;
    }
    var data = {}
    var clientInfo = this.props.route.config().getClientInfo();
    var header = {
      'X-Thrill-Client-Id': clientInfo.client_id,
      'X-Thrill-Auth-Token': clientInfo.auth_token
    }
    var self = this;

    this.props.route.config().httpInterceptor( this.props.route.config().url().BOOKINGS_LIST, 'GET', data, header, urlparams ).then(
      function ( result ) {
        if ( tabSection == 'history' ) {
          self.setState( {
            history: (result.total_count != 0) ? result.bookings : [],
            pageNumHistory: Math.ceil( result.total_count / 10 )
          } );
          if ( result.total_count == 0 ) {
            $( '.history-list' ).hide();
            $( '.no-message-history' ).show();
          } else {
            $( '.history-list' ).show();
            $( '.no-message-history' ).hide();

          }
        } else {
          self.setState( {
            bookings: (result.total_count != 0) ? result.bookings : [],
            pageNum: Math.ceil( result.total_count / 10 )
          } );
          if ( result.total_count == 0 ) {
            $( '.bookings-list' ).hide();
            $( '.no-message-bookings' ).show();
          } else {
            $( '.bookings-list' ).show();
            $( '.no-message-bookings' ).hide();
          }
        }


        $( '.odd' ).addClass( 'animated bounceInLeft' );
        $( '.even' ).addClass( 'animated bounceInRight' )
      },
      function ( result ) {
        console.log( result );
        //let message = JSON.parse(result.responseText);
        //self.props.route.notification._addNotification(window.event, "error", message.message);
      } );

  },
  componentDidMount: function () {
    $( '.no-message-history' ).hide();
    $( '.no-message-bookings' ).hide();
    $( '.breadcrumb' ).addClass( 'animated bounceInLeft' )
    this.props.route.config().redirectWithoutSession();
    this.props.route.notification.clearMenu();
    $( '.menu-option' ).removeClass( 'active' );
    $( '#bookings_menu' ).addClass( 'active' );
    this.loadfromServer( 1, 'bookings' );
    this.loadfromServer( 1, 'history' );
    $( document ).on( 'click', '.dropdown-menu li', function ( e ) {

      $( e.target ).parents( '.dropdown' ).find( '.selection' ).text( $( this ).text() );
      $( e.target ).parents( '.dropdown' ).find( '.selection' ).val( $( this ).text() );
      $( e.target ).parents( '.dropdown' ).find( '.selection' ).data( 'id', $( this ).data( 'id' ) );
    } );
    var urlparams = {
      'page': 1,
      'per_page': 10,
      'history': 1
    }
    var data = {}
    var clientInfo = this.props.route.config().getClientInfo();
    var header = {
      'X-Thrill-Client-Id': clientInfo.client_id,
      'X-Thrill-Auth-Token': clientInfo.auth_token
    }
    var self = this;
    this.props.route.config().httpInterceptor( this.props.route.config().url().LISTING, 'GET', data, header, urlparams ).then(
      function ( result ) {
        self.setState( {
          tour: result.tours
        } );

      },
      function ( result ) {
        console.log( result );
        //let message = JSON.parse(result.responseText);
        //self.props.route.notification._addNotification(window.event, "error", message.message);
      } );

  },
  loadfromServer: function ( pageNo, tabSection ) {

    var self = this;
    console.log( 'url-data-page:' + this.state.pageSelected );
    if ( tabSection == 'bookings' ) {
      //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);
      var urlparams = {
        'page': pageNo,
        'per_page': 10,
        'history': 1

      }
      var data = {}
      var clientInfo = this.props.route.config().getClientInfo();
      var header = {
        'X-Thrill-Client-Id': clientInfo.client_id,
        'X-Thrill-Auth-Token': clientInfo.auth_token
      }

      this.props.route.config().httpInterceptor( this.props.route.config().url().BOOKINGS_LIST, 'GET', data, header, urlparams ).then(
        function ( result ) {
          console.log( result.total_count );
          self.setState( {
            bookings: (result.total_count != 0) ? result.bookings : [],
            pageNum: Math.ceil( result.total_count / 10 )
          } );
          if ( result.total_count == 0 ) {
            $( '.bookings-list' ).hide();
            $( '.no-message-bookings' ).show();
          }
          $( '.odd' ).addClass( 'animated bounceInLeft' );
          $( '.even' ).addClass( 'animated bounceInRight' )
        },
        function ( result ) {
          console.log( result );
          //let message = JSON.parse(result.responseText);
          //self.props.route.notification._addNotification(window.event, "error", message.message);
        } );
    } else {
      var urlparams = {
        'page': pageNo,
        'per_page': 10,
        'history': 1
      }
      var data = {}
      var clientInfo = this.props.route.config().getClientInfo();
      var header = {
        'X-Thrill-Client-Id': clientInfo.client_id,
        'X-Thrill-Auth-Token': clientInfo.auth_token
      }

      this.props.route.config().httpInterceptor( this.props.route.config().url().BOOKINGS_LIST, 'GET', data, header, urlparams ).then(
        function ( result ) {
          self.setState( {
            history: (result.total_count != 0) ? result.bookings : [],
            pageNumHistory: Math.ceil( result.total_count / 10 )
          } );
          if ( result.total_count == 0 ) {
            $( '.history-list' ).hide();
            $( '.no-message-history' ).show();
          }
          $( '.odd' ).addClass( 'animated bounceInLeft' );
          $( '.even' ).addClass( 'animated bounceInRight' )
        },
        function ( result ) {
          console.log( result );
          //let message = JSON.parse(result.responseText);
          //self.props.route.notification._addNotification(window.event, "error", message.message);
        } );
    }

  },

  handlePageClick: function ( data ) {
    var currentPage = data.selected + 1;
    this.setState( {
      pageSelected: currentPage,
    } );
    this.loadfromServer( currentPage, 'bookings' );
    console.log( data.selected + 1 );
  },
  handlePageClickHistory: function ( data ) {
    var currentPage = data.selected + 1;
    this.setState( {
      pageSelected: currentPage,
    } );
    this.loadfromServer( currentPage, 'history' );
    console.log( data.selected + 1 );
  },
  render: function () {
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
          <TabBookingsComponent headers={ [ 'Upcoming Bookings', 'History' ] }
                                bookingscreen={ this }
                                tabs={ [ 'Upcoming Bookings', 'History' ] }
                                bookings={ this.state.bookings }
                                history={ this.state.history }
                                modalName={ this.state.modalName }
                                contact={ this.state.contactNumber }
                                pagenum={ this.state.pageNum }
                                pagenumHistory={ this.state.pageNumHistory }
                                tours={ this.state.tour } />
        </div>
      </div>
      <div className="modal fade"
           id="forgotPwModalBookings"
           tabindex="-1"
           role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <button type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
              <h2 id="name"></h2>
              <div className="phone-number" id="phone"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    );
  }

} );

module.exports = BookingScreen;
