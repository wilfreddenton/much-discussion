var React = require("react")
,   TopicActions = require('../actions/topic-actions')
,   TopicListItem = require('./topic-list-item')
,   TopicStore = require('../stores/topic-store');

function getState() {
  return {
    topics: TopicStore.getTopics()
  }
}

var Topics = React.createClass({
  mixins: [TopicStore.mixin],
  getInitialState: function() {
    return getState();
  },
  componentDidMount: function() {
    TopicActions.loadTopics();
  },
  storeDidChange: function() {
    this.setState(getState());
  },
  render: function() {
    var topicNodes = this.state.topics.map(function(topic) {
      return (
        <TopicListItem
          key={topic._id}
          _id={topic._id}
          name={topic.name} />
      );
    });
    return (
      <div className="container">
        <h3>topics</h3>
        {topicNodes}
      </div>
    );
  }
});

module.exports = Topics;