var React = require('react')
,   Input = require('./input')
,   TextArea = require('./text-area')
,   ReplyActions = require('../actions/reply-actions')
,   PostActions = require('../actions/post-actions')
,   Markdown = require('./markdown');
// ,   Router = require("react-router")
// ,   RouteHandler = Router.RouteHandler;

var ReplyForm = React.createClass({
  handleInputChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function() {
    ReplyActions.createReply(this.state);
    this.setState({text: ""});
  },
  componentWillReceiveProps(nextProps) {
    this.setState({postId: nextProps.postId});
  },
  getInitialState: function() {
    return {
      postId: this.props.postId,
      text: ""
    };
  },
  render: function() {
    return (
      <div className="post-form">
        <Markdown data={this.state.text} />
        <TextArea klass="reply-form-textarea" value={this.state.text} placeholder="Reply" inputCallback={this.handleInputChange} />
        <br />
        <button className="success" onClick={this.handleSubmit}>submit</button>
        <br />
        <br />
      </div>
    );
  }
});

module.exports = ReplyForm;