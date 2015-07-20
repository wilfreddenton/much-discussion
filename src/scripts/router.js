var React = require('react')
,   Router = require('react-router')
,   App = require('./components/app')
,   Home = require("./components/home")
,   Topics = require('./components/topics')
,   Topic = require('./components/topic')
,   TopicForm = require('./components/topic-form')
,   Post = require('./components/post')
,   PostTemp = require('./components/post-temp')
,   Posts = require('./components/posts')
,   PostForm = require('./components/post-form')
,   NotFound = require('./components/not-found');

var Route = Router.Route;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var routes = (
  <Route handler={App} path="/">
    <DefaultRoute name="app" handler={Home} />
    <Route name="topics" handler={Topics} />
    <Route name="topic" path="/topics/:_id" handler={Topic} >
      <DefaultRoute name="topic-show" handler={PostTemp} />
      <Route name="post-new" path="posts/new" handler={PostForm} />
      <Route name="post" path="posts/:post_id" handler={Post} />
    </Route>
    <NotFoundRoute handler={NotFound} />
  </Route>
);

module.exports = {
  run: function (el) {
    Router.run(routes, function (Handler, state) {
      var params = state.params;
      React.render(<Handler params={params} />, el);
    });
  }
};