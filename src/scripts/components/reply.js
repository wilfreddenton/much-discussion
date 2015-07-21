var React = require("react")
,   Markdown = require('./markdown')
,   moment = require('moment')
,   _ = require('lodash');

var Reply = React.createClass({
  render: function() {
    var formattedTime = moment(this.props.time).fromNow();
    return (
      <blockquote className="reply">
        <Markdown data={this.props.text} />
        <span>posted {formattedTime}</span>
      </blockquote>
    );
  }
});

module.exports = Reply;