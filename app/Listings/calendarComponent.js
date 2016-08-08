import React from 'react';
import ReactDOM from 'react-dom';

import FullCalendar from 'rc-calendar/lib/FullCalendar';

var moment = require( 'moment' );

import Select from 'rc-select';

function onSelect( value ) {
  //console.log('select', dateFormatter.format(value));
}

const CalendarComponent = React.createClass( {
  getInitialState() {
    return {
      type: 'date',
    };
  },
  onTypeChange( type ) {
    this.setState( {
      type,
    } );
  },


  componentDidMount: function () {
    $( '.rc-calendar-next-month-btn-day' ).hide();
    $( '.rc-calendar-full-header-switcher' ).hide();
    if ( $( '.rc-calendar-table' ).length == 2 ) {
      $( '.rc-calendar-table' ).first().find( 'th' ).each( function ( i ) {
        var weekday = (i == 0) ? 7 : i;
        $( this ).html( '<span class=\'rc-calendar-column-header item\'><input type=\'checkbox\' value=\'' + weekday + '\' class=\'weekday\' id=\'week1_' + i + '\'><label for=\'week1_' + i + '\'> ' + moment().day( $( this ).prop( 'title' ) ).format( 'ddd' ) + '</label><input type=\'text\' placeholder=\'Seats\'></span>' );
      } );
    }






    $( document ).off( 'click', 'td' ).on( 'click', 'td', function ( e ) {
      if ( moment( $( this ).prop( 'title' ) ).unix() >= moment( $( '.rc-calendar-today' ).prop( 'title' ) ).unix() ) {
        if ( !$( e.target ).closest( 'td' ).hasClass( 'active' ) ) {
          console.log( $( e.target ) );
          $( e.target ).closest( 'td' ).addClass( 'active' );
        }
      }
    } );
  },
  render() {
    var self = this;
    $( '.rc-calendar-table' ).find( 'td' ).each( function ( i ) {

      if ( parseInt( $( this ).find( 'div' ).html() ) < parseInt( $( '.rc-calendar-today' ).find( 'div' ).html() ) ) {
        $( this ).html( '<div class="rc-calendar-date"><a class="link" href="#">Edit</a><p class=" grey">' + $( this ).find( 'div' ).html() + '</p></div>' );
      } else {
        $( this ).html( '<div class="rc-calendar-date"><a class="link edit-link" href="javascript:void(0)">Edit</a><a class="link save-link hide" href="javascript:void(0)">Save</a><p>' + $( this ).find( 'div' ).html() + '</p><div class="gray-section"><div class="total">0/0</div></div><div class="gray-section2"><div class="total">Total seats <input type="text" ></div></div></div>' );
      }


    } );
    console.log( 'step5' );
    $( '.rc-calendar-table' ).find( 'td' ).each( function ( i ) {
      $( this ).removeClass( 'active' );
    } );
    if ( this.props.repeatFlag ) {
      console.log( 'step4' );
      $( '.rc-calendar-table' ).find( 'td' ).each( function ( i ) {
        console.log( self.props.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ) ).isoWeekday() ) ) );
        $( this ).removeClass( 'active' );
        if ( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ] ) {
          $( this ).find( '.gray-section .total' ).html( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].sold_count + '/' + self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].capacity );
          $( this ).find( '.gray-section2 .total input' ).val( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].capacity );

          if ( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].is_customized_date ) {
            $( this ).addClass( 'active' );
          }
        }

        if ( self.props.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ) ).isoWeekday() ) ) != -1 ) {
          console.log( 'step2' );
          if ( !$( this ).find( 'p' ).hasClass( 'grey' ) ) {
            console.log( self.props.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ) ).isoWeekday() ) ) );
            $( this ).addClass( 'active' );
          }
        }
      } );
    } else {
      console.log( 'step20' );
      $( '.rc-calendar-table' ).first().find( 'td' ).each( function ( i ) {
        $( this ).removeClass( 'active' );

        if ( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ] ) {
          $( this ).find( '.gray-section .total' ).html( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].sold_count + '/' + self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].capacity );
          $( this ).find( '.gray-section2 .total input' ).val( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].capacity );

          if ( self.props.variantDates[ moment( $( this ).prop( 'title' ) ).format( 'YYYY-MM-DD' ) ].is_customized_date ) {
            $( this ).addClass( 'active' );
          }
        }

        if ( self.props.weekdaysFlag.indexOf( parseInt( moment( $( this ).prop( 'title' ) ).isoWeekday() ) ) != -1 ) {

          if ( !$( this ).find( 'p' ).hasClass( 'grey' ) ) {

            $( this ).addClass( 'active' );
          }
        }
      } );
    }

    return (
    <div style={ { zIndex: 1000, position: 'relative' } }>
      <FullCalendar style={ { margin: 10 } }
                    Select={ Select }
                    value={ this.props.month }
                    fullscreen
                    onSelect={ onSelect }
                    type={ this.state.type }
                    onTypeChange={ this.onTypeChange } />
    </div>
    );
  },
} );

module.exports = CalendarComponent;
