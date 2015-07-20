var React = require("react")
,   moment = require('moment')
,   _ = require('lodash');

var Reply = React.createClass({
  render: function() {
    var formattedTime = moment(this.props.time).fromNow(); // moment(this.props.time).format('ll');
    return (
      <blockquote className="reply">
        <p>{this.props.text}</p>
        <span>posted {formattedTime}</span>
      </blockquote>
    );
  }
});

module.exports = Reply;