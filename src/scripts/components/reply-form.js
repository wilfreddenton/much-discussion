var React = require('react')
,   socket = require('../socket')
,   Input = require('./input')
,   TextArea = require('./text-area')
,   ReplyActions = require('../actions/reply-actions')
,   PostActions = require('../actions/post-actions')
,   Markdown = require('./markdown');

var ReplyForm = React.createClass({
  handleInputChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    socket.emit('createReply', {reply: this.state});
    this.setState({text: ""});
  },
  componentWillReceiveProps: function(nextProps) {
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
      <form className="post-form">
        <Markdown data={this.state.text} />
        <Input klass="reply-form-input" value={this.state.text} placeholder="Reply" inputCallback={this.handleInputChange} />
        <br />
        <button type="submit" className="success" onClick={this.handleSubmit}>submit</button>
        <br />
        <br />
      </form>
    );
  }
});

module.exports = ReplyForm;