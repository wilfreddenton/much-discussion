var React = require("react")
,   Posts = require('./posts')
,   PostStore = require('../stores/post-store')
,   PostActions = require('../actions/post-actions')
,   TopicStore = require('../stores/topic-store')
,   TopicActions = require('../actions/topic-actions')
,   Router = require("react-router")

var RouteHandler = Router.RouteHandler;
var Navigation = Router.Navigation;
var Link = Router.Link;

var Topic = React.createClass({
  mixins: [PostStore.mixin, Navigation],
  getState: function() {
    return {
      newPost: false,
      topic: TopicStore.getTopic(this.props.params._id),
      posts: PostStore.getPosts()
    }
  },
  setNewPost: function() {
    this.setState({newPost: true});
  },
  getInitialState: function() {
    return this.getState();
  },
  componentDidMount: function() {
    TopicActions.loadTopics();
    PostActions.loadPosts(this.props.params._id);
  },
  storeDidChange: function() {
    if (this.state.newPost) {
      this.setState(this.getState());
      var _id = this.state.posts[this.state.posts.length - 1]._id;
      this.transitionTo('post', {_id: this.props.params._id, post_id: _id});
    } else {
      this.setState(this.getState());
    }
  },
  render: function() {
    var data;
    if (this.props.params.post_id) {
      data = this.state.posts;
    } else {
      data = "";
    }
    return (
      <div className="container">
        <div className="row clearfix collapse-medium">
          <div className="col perc-35">
            <Link to="topics">&lt; topics</Link>
            <h3>{this.state.topic ? this.state.topic.name : ""}</h3>
            <Posts data={this.state.posts} params={this.props.params} />
            <br />
            <Link to="post-new" params={{_id: this.props.params._id}}>
              <button className="success">+ new post</button>
            </Link>
          </div>
          <div className="col perc-65">
            <RouteHandler {...this.props} data={data} submitCallback={this.setNewPost} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Topic;