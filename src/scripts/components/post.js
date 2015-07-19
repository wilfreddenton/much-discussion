var React = require("react")
,   PostActions = require('../actions/post-actions')
,   PostStore = require('../stores/post-store')
,   _ = require('lodash');

var Post = React.createClass({
  render: function() {
    var post = _.find(this.props.data, 'postId', this.props.params.post_id);
    return (
      <div className="post">
        <br />
        <hr />
        <h3>{post ? post.title : ""}</h3>
        <p>{post ? post.content : ""}</p>
      </div>
    );
  }
});

module.exports = Post;