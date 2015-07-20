var React = require("react")
,   Reply = require('./reply')
,   _ = require('lodash');

var Replies = React.createClass({
  render: function() {
    var replyNodes = this.props.data.map(function(reply) {
      return (
        <Reply key={reply._id} text={reply.text} time={reply.time} />
      );
    });
    return (
      <div className="replies">
        <h4>replies</h4>
        {replyNodes}
      </div>
    );
  }
});

module.exports = Replies;