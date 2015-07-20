var React = require("react")
,   Input = require('./input')
,   TopicActions = require('../actions/topic-actions');

var TopicForm = React.createClass({
  getInitialState: function() {
    return {
      inputValue: ""
    };
  },
  handleInputChange: function(e) {
    this.setState({inputValue: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    if (this.state.inputValue != "") {
      TopicActions.createTopic(this.state.inputValue);
      this.setState({
        inputValue: ""
      });
    }
  },
  render: function() {
    return (
      <form className="topic-form">
        <Input klass="topic-form-input" ref="inputValue" value={this.state.inputValue} placeholder="create new topic" inputCallback={this.handleInputChange} />
        <button className="success" type="submit" onClick={this.handleSubmit}>submit</button>
      </form>
    );
  }
});

module.exports = TopicForm;