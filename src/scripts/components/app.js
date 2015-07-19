var React = require("react")
,   Router = require("react-router")
,   RouteHandler = Router.RouteHandler;

var Link = Router.Link;

var App = React.createClass({
  render: function() {
    return (
      <div id="wrapper">
        <Link to="app"><img width="200" src="/assets/images/doge.jpeg" /></Link>
        <Link to="app"><h1>much discussion</h1></Link>
        <RouteHandler {...this.props} />
      </div>
    );
  }
});

module.exports = App;