var React = require('react')
,   marked = require('marked');

var MarkdownPreview = React.createClass({
  render: function() {
    var html = marked(this.props.data);
    return (
      <div className="markdown-preview" dangerouslySetInnerHTML={{__html: html}}></div>
    );
  }
});

module.exports = MarkdownPreview;