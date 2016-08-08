var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var cx = require( 'react-classset' );
var moment = require( 'moment' );
var ReviewsListing = React.createClass( {


  render: function () {
    console.log( this.props.listing );
    var self = this;
    var details = this.props.listing.reviews.map( function ( item ) {
      var rating = [ 1, 2, 3, 4, 5 ];
      var image = [ item.uploads.length ]
      var moreImage = image.map( function ( items ) {
        if ( items > 10 ) {
          return (
          <li>
            <span className="text">+ { items - 10 }</span>
          </li>

          )
        }
        return (<div></div>);


      } );
      var imageList = item.uploads.map( function ( items ) {

        return (
        <li>
          <img src={ items.size_tiny } />
        </li>

        );
      } );

      var ratingList = rating.map( function ( items ) {
        if ( item.rating >= items ) {
          var rate = true;
        } else {
          var rate = false;
        }
        var classes = cx( {
          'fa': true,
          'fa-star': true,
          'rate': rate
        } );

        return (
        <i className={ classes } aria-hidden="true"></i>

        );
      } );
      var posted_day = moment( item.posted_at ).fromNow();
      return (
      <div className="review-item">
        <div className="profile">
          <div className="pic">
            <img src={ item.user.size_tiny } />
          </div>
          <div className="info">
            <h4>{ item.user.name }</h4>
            <p>
              { posted_day }
            </p>
          </div>
        </div>
        <div className="rating">
          { ratingList }
        </div>
        <p>
          Do you believe in adventure and water sports? Then you need to head on for an exciting trekking and white water rafting experience to the Nishani Motte peak. Nishani is one of the unknown mountain ranges of Coorg, in the Western Ghats.
        </p>
        <ul className="album-thumb">
          { imageList }
          { moreImage }
        </ul>
      </div>
      );
    } );
    return (
    <div role="tabpanel"
         className="tab-pane"
         id="tabReviews">
      { details }
    </div>


    );
  }

} );

module.exports = ReviewsListing;
