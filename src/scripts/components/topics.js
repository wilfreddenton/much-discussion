var React = require("react")
,   socket = require('../socket')
,   TopicForm = require('./topic-form')
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
  loadTopicsHandler: function(result) {
    TopicActions.loadTopics(result.topics);
  },
  createTopicHandler: function(result) {
    TopicActions.createTopic(result.topic);
  },
  deleteTopicHandler: function(result) {
    TopicActions.deleteTopic(result.topicId);
  },
  componentDidMount: function() {
    socket.on('loadTopics', this.loadTopicsHandler);
    socket.on('createTopic', this.createTopicHandler);
    socket.on('deleteTopic', this.deleteTopicHandler);
    socket.emit('loadTopics');
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
        <TopicForm />
      </div>
    );
  }
});

module.exports = Topics;