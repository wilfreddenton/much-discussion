var React = require('react')
,   socket = require('../socket')
,   Input = require('./input')
,   TextArea = require('./text-area')
,   PostStore = require('../stores/post-store')
,   PostActions = require('../actions/post-actions')
,   Markdown = require('./markdown');

var PostForm = React.createClass({
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleContentChange: function(e) {
    this.setState({content: e.target.value});
  },
  handleSubmit: function() {
    this.props.submitCallback();
    if (this.state._id) {
      socket.emit('updatePost', {post: this.state});
    } else {
      socket.emit('createPost', {post: this.state});
    }
  },
  getPostHandler: function(result) {
    this.setState(result.post);
  },
  getInitialState: function() {
    return {
      topicId: this.props.params._id,
      title: "",
      content: ""
    };
  },
  componentDidMount: function() {
    if (this.props.params.post_id) {
      socket.on('getPost', this.getPostHandler);
      socket.emit('getPost', {postId: this.props.params.post_id});
    }
  },
  render: function() {
    return (
      <div className="post-form nested-route">
        <br />
        <Input klass="post-title-input" value={this.state.title} placeholder="Title" inputCallback={this.handleTitleChange} />
        <Markdown data={this.state.content} />
        <TextArea klass="post-content-textarea" value={this.state.content} placeholder="Content" inputCallback={this.handleContentChange} />
        <br />
        <button className="success" onClick={this.handleSubmit}>submit</button>
      </div>
    );
  }
});

module.exports = PostForm;