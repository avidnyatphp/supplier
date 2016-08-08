import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
import ReactPaginate from 'react-paginate';
var moment = require( 'moment' );
import Calendar from 'react-input-calendar'
class TabComponent extends Component {

  render() {
    var self = this;
    var counter = 1;

    var classname = 'odd';
    // const headers = ['heading 1', 'heading 2'];
    var listItems = this.props.bookings.map( function ( item ) {
      if ( counter % 2 == 0 ) {
        classname = 'even';
      } else {
        classname = 'odd';
      }
      counter++;
      function setInfo( item ) {
        $( '#name' ).html( item.first_name + ' ' + item.last_name );
        $( '#phone' ).html( item.phone );

      }
      function showDetails( bookingId ) {
        window.location.href = '/#/bookingDetails/' + bookingId;
      }
      return (

      <div className={ classname + ' booking-card' }>
        <div className="img" onClick={ () => showDetails( item.id ) }>
          <img src={ item.tour.thumbnail_image ? item.tour.thumbnail_image.size_tiny : 'images/src.jpg' } onerror="this.src='images/notFound.png'" />
        </div>
        <div className="info">
          <div className="details">
            <h3 onClick={ () => showDetails( item.id ) }>{ item.tour.name }</h3>
            <p>
              Booked by:
              { item.first_name }
              { item.last_name } | Booking Date:
              { moment( item.created_at ).format( 'D MMMM' ) }
            </p>
            <p>
              <img src="images/icon-date.png" />Trip Date:
              { moment( item.date_of_travel ).format( 'D MMMM YYYY' ) }
            </p>
            <p>
              <img src="images/icon-travellar.png" />Travelers:
              { item.no_of_people }
            </p>
          </div>
          <div className="contact">
            <div className="contact-info"
                 data-toggle="modal"
                 data-target="#forgotPwModalBookings"
                 onClick={ () => setInfo( item ) }>
              <span><img src="images/icon-phone.png" /></span>Contact Details
            </div>
          </div>
        </div>
      </div>

      );
    } );
    var counter = 1;

    var classname = 'odd';
    var listItemsHistory = this.props.history.map( function ( item ) {

      if ( counter % 2 == 0 ) {
        classname = 'even';
      } else {
        classname = 'odd';
      }
      counter++;
      function setInfo( item ) {
        $( '#name' ).html( item.first_name + ' ' + item.last_name );
        $( '#phone' ).html( item.phone );

      }
      function showDetails( bookingId ) {
        window.location.href = '/#/bookingDetails/' + bookingId;
      }
      return (

      <div className={ classname + ' booking-card' }>
        <div className="img" onClick={ () => showDetails( item.id ) }>
          <object data="images/notFound.png"
                  type="image/png"
                  className="image-booking-default">
            <img src={ item.tour.thumbnail_image ? item.tour.thumbnail_image.size_tiny : 'images/src.jpg' } onerror="this.src='images/notFound.png'" />
          </object>
        </div>
        <div className="info">
          <div className="details">
            <h3 onClick={ () => showDetails( item.id ) }>{ item.tour.name }</h3>
            <p>
              Booked by:
              { item.first_name }
              { item.last_name } | Booking Date:
              { moment( item.created_at ).format( 'D MMMM' ) }
            </p>
            <p>
              <img src="images/icon-date.png" />Trip Date:
              { moment( item.date_of_travel ).format( 'D MMMM YYYY' ) }
            </p>
            <p>
              <img src="images/icon-travellar.png" />Travelers:
              { item.no_of_people }
            </p>
          </div>
          <div className="contact">
            <div className="contact-info"
                 data-toggle="modal"
                 data-target="#forgotPwModalBookings"
                 onClick={ () => setInfo( item ) }>
              <span><img src="images/icon-phone.png" /></span>Contact Details
            </div>
          </div>
        </div>
      </div>

      );
    } );
    var tours = this.props.tours.map( function ( item ) {


      return (


      <li data-id={ item.id }>
        { item.name }
      </li>



      );
    } );
    var self = this;
    function callGetData( timeDate, tabSection ) {
      var from = -1;
      var to = -1;

      if ( timeDate == 'Today' ) {
        from = moment().format( 'YYYY-MM-DD' );
        to = moment().format( 'YYYY-MM-DD' );
      } else if ( timeDate == 'Tomorrow' ) {
        from = moment( moment().add( 'days', 1 ) ).format( 'YYYY-MM-DD' );
        to = moment( moment().add( 'days', 1 ) ).format( 'YYYY-MM-DD' );
      } else if ( timeDate == 'Weekend' ) {
        from = moment().day( 6 ).format( 'YYYY-MM-DD' );
        to = moment().day( 7 ).format( 'YYYY-MM-DD' );
      }
      if ( $( '.selection:last' ).text() != ' All' ) {
        var tourId = $( '.selection:last' ).data( 'id' );
      } else {
        var tourId = -1;
      }
      self.props.bookingscreen.getData( from, to, tourId, tabSection );
    }
    function getDate( dateTime ) {
      console.log( dateTime );
      if ( $( '.selection:last' ).text() != ' All' ) {
        var tourId = $( '.selection:last' ).data( 'id' );
      } else {
        var tourId = -1;
      }
      var from = moment( dateTime ).format( 'YYYY-MM-DD' );
      var to = moment( dateTime ).format( 'YYYY-MM-DD' );
      self.props.bookingscreen.getData( from, to, tourId, 'history' );
    }
    function getDateBookings( dateTime ) {
      console.log( dateTime );
      if ( $( '.selection:first' ).text() != ' All' ) {
        var tourId = $( '.selection:first' ).data( 'id' );
      } else {
        var tourId = -1;
      }
      var from = moment( dateTime ).format( 'YYYY-MM-DD' );
      var to = moment( dateTime ).format( 'YYYY-MM-DD' );
      self.props.bookingscreen.getData( from, to, tourId, 'bookings' );
    }

    return (
    <div>
      <Tabs headers={ this.props.headers }>
        <Tab>
          <div className="sort-list">
            <p>
              Sort By:
            </p>
            <div className="checkbox">
              <input type="checkbox" id="sortcb1" />
              <label for="sortcb1" onClick={ () => callGetData( 'Today', 'bookings' ) }>
                Today
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="sortcb2" />
              <label for="sortcb2" onClick={ () => callGetData( 'Tomorrow', 'bookings' ) }>
                Tomorrow
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="sortcb3" />
              <label for="sortcb3" onClick={ () => callGetData( 'Weekend', 'bookings' ) }>
                This Weekend
              </label>
            </div>
            <div className="sort-dropdown">
              <Calendar format='DD/MM/YYYY'
                        placeholder="Trip Date"
                        customIcon="glyphicon glyphicon-menu-down"
                        onChange={ getDateBookings } />
            </div>
            <div className="sort-dropdown">
              <div className="dropdown">
                <button className="btn dropdown-toggle" data-toggle="dropdown">
                  <span className="selection">All</span>
                  <span className="glyphicon glyphicon-menu-down"></span>
                </button>
                <ul className="dropdown-menu tour-dropdown">
                  { tours }
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-pane active" id="tabNewBookings">
            { listItems }
          </div>
          <div className="no-message-bookings text-center">
            No upcoming bookings.
          </div>
          <div className="bookings-list text-center">
            <ReactPaginate previousLabel={ "previous" }
                           nextLabel={ "next" }
                           breakLabel={ <a href="">...</a> }
                           pageNum={ self.props.pagenum }
                           marginPagesDisplayed={ 2 }
                           pageRangeDisplayed={ 5 }
                           clickCallback={ self.props.bookingscreen.handlePageClick }
                           containerClassName={ "pagination" }
                           subContainerClassName={ "pages pagination" }
                           activeClassName={ "active" } />
          </div>
        </Tab>
        <Tab>
          <div className="sort-list">
            <p>
              Sort By:
            </p>
            <div className="checkbox">
              <input type="checkbox" id="sortcb1" />
              <label for="sortcb1" onClick={ () => callGetData( 'Today', 'history' ) }>
                Today
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="sortcb2" />
              <label for="sortcb2" onClick={ () => callGetData( 'Tomorrow', 'history' ) }>
                Tomorrow
              </label>
            </div>
            <div className="checkbox">
              <input type="checkbox" id="sortcb3" />
              <label for="sortcb3" onClick={ () => callGetData( 'Weekend', 'history' ) }>
                This Weekend
              </label>
            </div>
            <div className="sort-dropdown">
              <Calendar format='DD/MM/YYYY'
                        placeholder="Trip Date"
                        customIcon="glyphicon glyphicon-menu-down"
                        onChange={ getDate } />
            </div>
            <div className="sort-dropdown">
              <div className="dropdown">
                <button className="btn dropdown-toggle" data-toggle="dropdown">
                  <span className="selection">All</span>
                  <span className="glyphicon glyphicon-menu-down"></span>
                </button>
                <ul className="dropdown-menu tour-dropdown">
                  { tours }
                </ul>
              </div>
            </div>
          </div>
          <div className="tab-pane active " id="tabNewBookings">
            { listItemsHistory }
          </div>
          <div className="no-message-history text-center">
            No bookings history.
          </div>
          <div className="history-list text-center">
            <ReactPaginate previousLabel={ "previous" }
                           nextLabel={ "next" }
                           breakLabel={ <a href="">...</a> }
                           pageNum={ self.props.pagenumHistory }
                           marginPagesDisplayed={ 2 }
                           pageRangeDisplayed={ 5 }
                           clickCallback={ self.props.bookingscreen.handlePageClickHistory }
                           containerClassName={ "pagination" }
                           subContainerClassName={ "pages pagination" }
                           activeClassName={ "active" } />
          </div>
        </Tab>
      </Tabs>
    </div>
    )
  }
}



module.exports = TabComponent;
