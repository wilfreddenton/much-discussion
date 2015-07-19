var React = require("react")
,   Router = require("react-router")

var Link = Router.Link;

var TopicListItem = React.createClass({
  render: function() {
    return (
      <div className="topic-list-item">
        <Link to="topic" params={{_id: this.props._id}}>{this.props.name}</Link>
      </div>
    );
  }
});

module.exports = TopicListItem;