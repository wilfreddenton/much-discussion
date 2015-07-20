var React = require("react")
,   Router = require("react-router")
,   RouteHandler = Router.RouteHandler;

var Link = Router.Link;

var App = React.createClass({
  render: function() {
    return (
      <div id="wrapper">
        <div className="container">
          <div className="row clearfix">
            <div className="col perc-20">
              <Link to="app"><img id="doge" className="responsive" width="100" src="/assets/images/doge.jpeg" /></Link>
            </div>
            <div className="col perc-80">
              <Link to="app"><h1>much discussion</h1></Link>
            </div>
          </div>
        </div>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = App;