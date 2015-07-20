var React = require("react")
,   Markdown = require('./markdown')
,   Replies = require('./replies')
,   ReplyForm = require('./reply-form')
,   ReplyActions = require('../actions/reply-actions')
,   ReplyStore = require('../stores/reply-store')
,   _ = require('lodash');

var Post = React.createClass({
  mixins: [ReplyStore.mixin],
  getState: function() {
    return {
      postId: this.props.params.post_id,
      replies: ReplyStore.getReplies(this.props.params.post_id)
    };
  },
  getInitialState: function() {
    return this.getState();
  },
  componentWillReceiveProps: function(nextProps) {
    ReplyActions.loadReplies(nextProps.params.post_id);
  },
  componentDidMount: function() {
    ReplyActions.loadReplies(this.props.params.post_id);
  },
  storeDidChange: function() {
    this.setState(this.getState());
  },
  render: function() {
    var post = _.find(this.props.data, '_id', this.props.params.post_id);
    return (
      <div className="post nested-route">
        <h3>{post ? post.title : ""}</h3>
        <Markdown data={post ? post.content : ""} />
        <Replies data={this.state.replies} />
        <ReplyForm postId={this.props.params.post_id} />
      </div>
    );
  }
});

module.exports = Post;