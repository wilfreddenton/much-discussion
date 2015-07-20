var React = require("react")
,   socket = require('../socket')
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
  loadRepliesHandler: function(result) {
    ReplyActions.loadReplies(result.replies);
  },
  createReplyHandler: function(result) {
    ReplyActions.createReply(result.reply);
  },
  getInitialState: function() {
    return this.getState();
  },
  componentWillReceiveProps: function(nextProps) {
    socket.emit('loadReplies', {postId: nextProps.params.post_id});
  },
  componentDidMount: function() {
    socket.on('loadReplies', this.loadRepliesHandler);
    socket.on('createReply', this.createReplyHandler);
    socket.emit('loadReplies', {postId: this.props.params.post_id});
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