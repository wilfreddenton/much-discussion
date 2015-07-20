var React = require('react')
,   Input = require('./input')
,   TextArea = require('./text-area')
,   PostActions = require('../actions/post-actions')
,   Markdown = require('./markdown');
// ,   Router = require("react-router")
// ,   RouteHandler = Router.RouteHandler;

var PostForm = React.createClass({
  handleTitleChange: function(e) {
    this.setState({title: e.target.value});
  },
  handleContentChange: function(e) {
    this.setState({content: e.target.value});
  },
  handleSubmit: function() {
    this.props.submitCallback();
    PostActions.createPost(this.state);
  },
  getInitialState: function() {
    return {
      topicId: this.props.params._id,
      title: "",
      content: ""
    };
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