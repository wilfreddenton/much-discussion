var React = require("react")
,   socket = require('../socket')
,   Router = require("react-router")
,   TopicActions = require('../actions/topic-actions');

var Link = Router.Link;

var TopicListItem = React.createClass({
  deleteTopic: function() {
    socket.emit('deleteTopic', {topicId: this.props._id});
  },
  render: function() {
    return (
      <div className="topic-list-item row clearfix">
        <div className="col perc-75">
          <Link to="topic" params={{_id: this.props._id}}>{this.props.name}</Link>
        </div>
        <div className="col perc-25">
          <button className="list-item-delete failure" onClick={this.deleteTopic}>delete</button>
        </div>
      </div>
    );
  }
});

module.exports = TopicListItem;