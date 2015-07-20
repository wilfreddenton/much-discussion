// React
var React = require("react");

// Component
var Input = React.createClass({
  handleInputChange: function (e) {
    this.props.inputCallback(e);
  },
  render: function () {
    return (
      <input className={'controlled-input ' + this.props.klass}
        type="text"
        value={this.props.value}
        placeholder={this.props.placeholder}
        onChange={this.handleInputChange} />
    );
  }
});

module.exports = Input;
