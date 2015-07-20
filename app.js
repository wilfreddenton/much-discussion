var express = require('express')
,   cookieParser = require('cookie-parser')
,   bodyParser = require('body-parser')
,   mockDb = require('./mockDb')
,   socket = require('socket.io')
,   _ = require('lodash');

var app = express();
var server = require('http').createServer(app);
var io = socket(server);

app.set('port', process.env.PORT || 4200);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use(express.static(__dirname + '/dist'));

function generateId() {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 5);
}

app.get('/topics', function(req, res) {
  res.json({topics: mockDb.mockTopics});
});

app.post('/topics', function(req, res) {
  var _id = generateId();
  var topic = {
    _id: _id,
    name: req.body.name
  };
  mockDb.mockTopics.push(topic);
  res.json({topic: topic});
});

app.delete('/topics/:_id', function(req, res) {
  _.remove(mockDb.mockTopics, function(topic) {
    return topic._id === req.params._id;
  });
  res.json({status: 'success'});
});

// keep in mind a topic is a collection of posts
app.get('/topics/:_id', function(req, res) {
  var posts = _.where(mockDb.mockPosts, {topicId: req.params._id});
  res.json({topic: posts});
});

app.post('/posts', function(req, res) {
  var _id = generateId();
  var post = req.body;
  post._id = _id;
  mockDb.mockPosts.push(post);
  res.json({post: post});
});

app.delete('/posts/:_id', function(req, res) {
  _.remove(mockDb.mockPosts, function(post) {
    return post._id === req.params._id;
  });
  _.remove(mockDb.mockReplies, function(reply) {
    return reply.postId === req.params._id;
  });
  res.json({status: 'success'});
});

app.post('/replies', function(req, res) {
  var _id = generateId();
  var reply = req.body;
  reply._id = _id;
  reply.time = new Date().getTime();
  mockDb.mockReplies.push(reply);
  res.json({reply: reply});
});

// keep in mind replies are organized by the post they belong to
app.get('/replies/:post_id', function(req, res) {
  var replies = _.where(mockDb.mockReplies, {postId: req.params.post_id});
  res.json({replies: replies});
});

server.listen(app.get('port'), function() {
  console.log("server starting on port: " + app.get('port'));
});

io.on('connection', function (socket) {
  socket.emit('hey', { hello: 'world' });
  socket.on('loadTopics', function() {
    socket.emit('loadTopics', {topics: mockDb.mockTopics});
  });
  socket.on('createTopic', function(data) {
    var _id = generateId();
    var topic = {
      _id: _id,
      name: data.name
    };
    mockDb.mockTopics.push(topic);
    io.sockets.emit('createTopic', {topic: topic});
  });
  socket.on('deleteTopic', function(data) {
    _.remove(mockDb.mockTopics, function(topic) {
      return topic._id === data.topicId;
    });
    io.sockets.emit('deleteTopic', {topicId: data.topicId});
  });
  socket.on('loadPosts', function(data) {
    var posts = _.where(mockDb.mockPosts, {topicId: data.topicId});
    socket.emit('loadPosts', {topic: posts});
  });
  socket.on('getPost', function(data) {
    var post = _.find(mockDb.mockPosts, '_id', data.postId);
    socket.emit('getPost', {post: post});
  });
  socket.on('createPost', function(data) {
    var _id = generateId();
    var post = data.post;
    post._id = _id;
    mockDb.mockPosts.push(post);
    io.sockets.emit('createPost', {post: post});
  });
  socket.on('deletePost', function(data) {
    _.remove(mockDb.mockPosts, function(post) {
      return data.postId === post._id;
    });
    io.sockets.emit('deletePost', {postId: data.postId});
  });
  socket.on('updatePost', function(data) {
    _.remove(mockDb.mockPosts, function(post) {
      return post._id === data.post._id;
    });
    mockDb.mockPosts.push(data.post);
    io.sockets.emit('updatePost', {post: data.post});
  });
  socket.on('loadReplies', function(data) {
    var replies = _.where(mockDb.mockReplies, {postId: data.postId});
    socket.emit('loadReplies', {replies: replies});
  });
  socket.on('createReply', function(data) {
    var _id = generateId();
    var reply = data.reply;
    reply._id = _id;
    reply.time = new Date().getTime();
    mockDb.mockReplies.push(reply);
    io.sockets.emit('createReply', {reply: reply});
  });
});