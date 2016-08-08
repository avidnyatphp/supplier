
import { Router, Route, Link, hashHistory } from 'react-router';
import { Tabs, Tab } from 'react-tab-view'
var TabListingComponent = require( './TabListingComponent.js' );
import React, { Component, PropTypes } from 'react'
var STATES = require( '../components/data/states' );
import ReactPaginate from 'react-paginate';
var _ = require( 'underscore' );
var ListingDetailsScreen = React.createClass( {
  getInitialState: function () {
    return {
      listing: {
        description_details: {

        },
        reviews: [],
        variants: [],
        feature_ids: [],
        sub_category_ids: []
      },
      variantDates: [ {

      } ],
      Tabsheader: [ 'Overview', 'Details', 'Variants', 'Reviews' ],
      stateName: '',
      seed: {}

    }
  },

  componentDidMount: function () {
    this.props.route.config().redirectWithoutSession();
    this.loadfromServer( 1 );
  },
  loadfromServer: function ( pageNo ) {

    var self = this;
    console.log( 'url-data-page:' + this.state.pageSelected );
    //console.log(JSON.parse(localStorage.getItem("clientInfo")).client.client_id);

    var urlparams = {

    }
    var data = {}
    var clientInfo = this.props.route.config().getClientInfo();
    var header = {};


    this.props.route.config().httpInterceptor( this.props.route.config().url().LISTING_DETAILS + this.props.params.listingid + '?', 'GET', data, header, this.props.route.config().getClientInfo() ).then(
      function ( result ) {

        var header = {
        }
        var clientInfo = self.props.route.config().getClientInfo();
        clientInfo[ 'country_id' ] = parseInt( result.tour_location.country_id );

        clientInfo[ 'state_id' ] = parseInt( result.tour_location.state_id );

        self.props.route.config().httpInterceptor( self.props.route.config().url().STATE, 'GET', data, header, clientInfo ).then(
          function ( result1 ) {


            var filteredGoal = _.where( result1.states, {
              id: parseInt( result.tour_location.state_id )
            } );


            result[ 'state_name' ] = filteredGoal[ 0 ].name;
            result[ 'place_name' ] = result.tour_location.name;
            self.setState( {
              listing: result
            } );

            var variantDates = [];
            self.state.listing.variants.map( function ( item ) {
              self.props.route.config().httpInterceptor( self.props.route.config().url().VARIANT + self.props.params.listingid + '/variants_dates_data?variant_id=' + item.id + '&', 'GET', data, header, self.props.route.config().getClientInfo() ).then(
                function ( result ) {


                  variantDates.push( result.variants );
                  self.setState( {
                    variantDates: variantDates
                  } );

                },
                function ( result ) {
                  let message = JSON.parse( result.responseText );

                } );





            },
              function ( result ) {
                let message = JSON.parse( result.responseText );
                console.log( message );
                // self.props.config.notification._addNotification(window.event, "error", message.message);
              } );

          } )
      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.route.notification._addNotification( window.event, 'error', message.message );
      } );
    this.props.route.config().httpInterceptor( this.props.route.config().url().SEED, 'GET', data, header, this.props.route.config().getClientInfo() ).then(
      function ( result ) {
        self.setState( {
          seed: result
        } );


      },
      function ( result ) {
        let message = JSON.parse( result.responseText );
        self.props.route.notification._addNotification( window.event, 'error', message.message );
      } );


  },

  handlePageClick: function ( data ) {
    var currentPage = data.selected + 1;
    this.setState( {
      pageSelected: currentPage,
    } );
    this.loadfromServer( currentPage );
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
            <li>
              <a href="/#/listings">Listing</a>
            </li>
            <li className="active">
              { this.state.listing.name }
            </li>
          </ol>
          <div className="row">
            <div className="col-sm-8">
              <h3>{ this.state.listing.name }, { this.state.listing.state_name }</h3>
              <ul className="highlights">
                <li>
                  <div className="rating">
                    <span>{ this.state.listing.average_rating }</span>
                    { this.state.listing.reviews_count } Reviews
                  </div>
                </li>
                <li>
                  <img src="images/icon-day.png" />
                  { this.state.listing.days } Days
                </li>
                <li>
                  <img src="images/icon-night.png" />
                  { this.state.listing.nights } Night
                </li>
                <li>
                  <img src="images/icon-location.png" />
                  { this.state.listing.place_name },
                  { this.state.listing.state_name }
                </li>
              </ul>
            </div>
            <div className="col-sm-4 text-right">
              <div className="right-block">
                <p>
                  Starting From
                </p>
                <div className="">
                  <p className="price">
                    <i className="fa fa-inr" aria-hidden="true"></i>
                    { this.state.listing.price }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="tab-section">
        <TabListingComponent headers={ this.state.Tabsheader }
                             listing={ this.state.listing }
                             seed={ this.state.seed }
                             variantDates={ this.state.variantDates } />
      </div>
    </div>
    );
  }

} );

module.exports = ListingDetailsScreen;
