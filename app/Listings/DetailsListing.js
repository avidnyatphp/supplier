var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var DetailsListing = React.createClass( {


  render: function () {
    console.log( this.props.listing );
    var self = this;
    var details = Object.keys( this.props.listing.description_details ).map( function ( item ) {
      var detailsItems = self.props.listing.description_details[ item ].map( function ( items ) {
        return (
        <li>
          { items }
        </li>

        );
      } );
      return (
      <div>
        <hr />
        <h3>{ item }</h3>
        <ul className="arrow-list">
          { detailsItems }
        </ul>
      </div>
      );
    } );
    return (
    <div role="tabpanel"
         className="tab-pane"
         id="tabDetails">
      <h3>Itenary</h3>
      <div className="details">
        <h4><span></span>Arrive Livingstone</h4>
        <p>
          Upon arrival at Livingstone Airport, you will be transferred to the hotel where you will spend that day as you wish to.
        </p>
        <p>
          Overnight stay at hotel.
        </p>
        <h4><span></span>At Livingstone (Day 2 and Day 3)</h4>
        <p>
          You can use two full days to rest, relax, and take in the sights, sounds and smells of the African adventure.
        </p>
        <p>
          Go visit the Devils Pool at the edge of Victoria Falls, walk with the lions, do the Vic Falls tour, abseil, leap off God’s Swing, try out the zip line, or jump off 111 meters from a bridge over the mighty Zambezi.
        </p>
        <p>
          Later in the evening, you could go for a sunset cruise on the Zambezi with drinks, and snacks served on board.
        </p>
        <p>
          Later, the river trip leader will pop into the hotel and pass out your dry bags and equipment and give you a rundown of your trip, what to pack, what to expect and introduce the guides.
        </p>
        <p>
          Overnight stay at hotel in Livingstone.
        </p>
        <h4><span></span>Livingstone – White River Rafting on the Zambezi River from Boiling Pot to Rapid 10</h4>
        <p>
          You will have breakfast at the hotel following which the river team will be around to collect you and transport you to the top of the gorge where they will give you your high float jackets, helmets and paddles.
        </p>
        <p>
          After lunch on the way, drive to mesmerizing moon landscapes and the Lamayuru monastery, overnight stay in Sham.
        </p>
        <p>
          From here you walk down into the gorge through stunning rain-forest to the water’s edge.
        </p>
        <p>
          On arrival at the river you will be given a thorough safety briefing and outline safety procedures
        </p>
      </div>
      { details }
    </div>


    );
  }

} );

module.exports = DetailsListing;
