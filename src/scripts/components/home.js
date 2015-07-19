var React = require("react")
,   Router = require("react-router");

var Link = Router.Link;

var Home = React.createClass({
  render: function() {
    return (
      <div className="container">
        <p>Create topics, make posts about topics, reply to those posts.</p>
        <Link to="topics">topics</Link>
      </div>
    );
  }
});

module.exports = Home;