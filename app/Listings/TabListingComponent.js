import { Tabs, Tab } from 'react-tab-view'
import React, { Component, PropTypes } from 'react'
var OverviewListing = require( './OverviewListing.js' );
var DetailsListing = require( './DetailsListing.js' );
var ReviewsListing = require( './ReviewsListing.js' );
var VariantListing = require( './VariantListing.js' );
class TabListingComponent extends Component {


  render() {

    return (
    <div>
      <Tabs headers={ this.props.headers }>
        <Tab>
          <OverviewListing listing={ this.props.listing } seed={ this.props.seed } />
        </Tab>
        <Tab>
          <DetailsListing listing={ this.props.listing } />
        </Tab>
        <Tab>
          <VariantListing listing={ this.props.listing }
                          variantDates={ this.props.variantDates }
                          seed={ this.props.seed } />
        </Tab>
        <Tab>
          <ReviewsListing listing={ this.props.listing } />
        </Tab>
      </Tabs>
    </div>
    )
  }
}



module.exports = TabListingComponent;
