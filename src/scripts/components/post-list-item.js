var React = require("react")
,   Router = require("react-router")
,   PostActions = require('../actions/post-actions');

var Navigation = Router.Navigation;
var Link = Router.Link;

var PostListItem = React.createClass({
  mixins: [Navigation],
  deletePost: function() {
    PostActions.deletePost(this.props._id);
    if (this.props.params.post_id === this.props._id) {
      this.transitionTo('topic', {_id: this.props.topicId});
    }
  },
  render: function() {
    return (
      <div className={'post-list-item row clearfix ' + this.props.klass}>
        <div className="col perc-75">
          <Link to="post" params={{_id: this.props.topicId, post_id: this.props._id}}>{this.props.title}</Link>
        </div>
        <div className="col perc-25">
          <button className="list-item-delete failure" onClick={this.deletePost}>delete</button>
        </div>
      </div>
    );
  }
});

module.exports = PostListItem;