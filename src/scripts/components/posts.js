var React = require("react")
,   PostListItem = require('./post-list-item');

var Posts = React.createClass({
  render: function() {
    var postNodes = this.props.data.map(function(post) {
      return (
        <PostListItem
          key={post.postId}
          topicId={post.topicId}
          postId={post.postId}
          title={post.title} />
      );
    });
    return (
      <div className="posts">
        {postNodes}
      </div>
    );
  }
});

module.exports = Posts;