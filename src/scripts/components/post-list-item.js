var React = require("react")
,   Router = require("react-router")

var Link = Router.Link;

var PostListItem = React.createClass({
  render: function() {
    return (
      <div className="topic-list-item">
        <Link to="post" params={{_id: this.props.topicId, post_id: this.props.postId}}>{this.props.title}</Link>
      </div>
    );
  }
});

module.exports = PostListItem;