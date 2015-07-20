// React
var React = require("react");

// Component
var TextArea = React.createClass({
  handleInputChange: function (e) {
    this.props.inputCallback(e);
  },
  render: function () {
    return (
      <textarea
        className={'controlled-textarea ' + this.props.klass}
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleInputChange}></textarea>
    );
  }
});

module.exports = TextArea;
