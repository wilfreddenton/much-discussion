var React = require("react")
,   Posts = require('./posts')
,   PostStore = require('../stores/post-store')
,   PostActions = require('../actions/post-actions')
,   TopicStore = require('../stores/topic-store')
,   TopicActions = require('../actions/topic-actions')
,   Router = require("react-router")
,   RouteHandler = Router.RouteHandler;

var Topic = React.createClass({
  mixins: [PostStore.mixin],
  getState: function() {
    return {
      topic: TopicStore.getTopic(this.props.params._id),
      posts: PostStore.getPosts()
    }
  },
  getInitialState: function() {
    return this.getState();
  },
  componentDidMount: function() {
    TopicActions.loadTopics();
    PostActions.loadPosts(this.props.params._id);
  },
  storeDidChange: function() {
    this.setState(this.getState());
  },
  render: function() {
    return (
      <div className="topic">
        <h3>{this.state.topic ? this.state.topic.name : ""}</h3>
        <Posts data={this.state.posts} />
        <RouteHandler {...this.props} data={this.state.posts} />
      </div>
    );
  }
});

module.exports = Topic;