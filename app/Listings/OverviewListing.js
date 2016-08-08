var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var _ = require( 'underscore' );
var OverviewListing = React.createClass( {


  render: function () {
    var featureArray = [];
    console.log( this.props.listing );
    var self = this;
    var features = this.props.listing.feature_ids.map( function ( item ) {
      var obj = _.where( self.props.seed.features, {
        'id': item
      } );
      console.log( obj );

      return (

      <div className="item">
        <img src={ obj[ 0 ].icon_url } />
        <p>
          { obj[ 0 ].name }
        </p>
      </div>

      );
    } );
    var subCategories = this.props.listing.sub_category_ids.map( function ( item ) {
      var obj = _.where( self.props.seed.sub_categories, {
        'id': item
      } );
      console.log( obj );
      if ( obj.length != 0 ) {
        return (

        <p>
          { obj[ 0 ].name }
        </p>

        );
      }
    } );


    return (
    <div role="tabpanel"
         className="tab-pane active"
         id="tabOverview">
      <div className="highlights">
        { features }
      </div>
      <h3>Overview</h3>
      <p dangerouslySetInnerHTML={ { __html: this.props.listing.overview } }></p>
      <h3>Selected Categories</h3>
      <div className="item2">
        { subCategories }
      </div>
    </div>
    );
  }

} );

module.exports = OverviewListing;
