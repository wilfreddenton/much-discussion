var React = require("react")
,   PostListItem = require('./post-list-item');

var Posts = React.createClass({
  render: function() {
    var self = this;
    var postNodes = this.props.data.map(function(post) {
      return (
        <PostListItem
          klass={self.props.params.post_id === post._id ? 'active' : ''}
          key={post._id}
          topicId={post.topicId}
          _id={post._id}
          title={post.title}
          params={self.props.params} />
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