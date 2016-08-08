var React = require( 'react' );
import { Router, Route, Link, hashHistory } from 'react-router';
var ThankYouScreen = React.createClass( {
  componentDidMount: function () {
    $( 'body' ).addClass( 'before-login' );

  },

  render: function () {
    return (
    <div className="application_wrapper">
      <div className="page-body grey2">
        <div className="container text-center login-text">
          <h2>Be our agent <span className="secondary">increase our revenue!</span></h2>
          <p>
            Thrillophilia helps you market your products to millions of its customers!
          </p>
        </div>
      </div>
      <div className="page-body bg-img">
        <div className="container">
          <div className="register">
            <div className="row">
              <div className="col-sm-1">
              </div>
              <div className="col-sm-10 form-animate">
                <div className="row text-center hand-padding">
                  <div className="col-sm-12">
                    <img src="./images/hand.png" height="85" />
                  </div>
                  <div className="col-sm-12 thanks-message">
                    <span>Thanks! We will be in touch soon.</span>
                  </div>
                  <div className="col-sm-12 thanks-sub-heading">
                    <span>You have successfully sent a request to be an Agent.</span>
                  </div>
                  <div className="col-sm-12 message">
                    <span>We are evaluating your details and will get back to you</span>
                  </div>
                  <div className="col-sm-12 message-sub">
                    <span>shortly to know more about your business!</span>
                  </div>
                </div>
              </div>
              <div className="col-sm-1">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }

} );

module.exports = ThankYouScreen;
