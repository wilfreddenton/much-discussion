var React = require("react")

var PostTemp = React.createClass({
  render: function() {
    return (
      <div className="post-temp nested-route">
        <p>Click one of the posts on the left to view it</p>
      </div>
    );
  }
});

module.exports = PostTemp;