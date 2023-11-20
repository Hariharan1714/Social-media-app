const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

let posts = [];

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/add-post', (req, res) => {
  const { imageLink, description } = req.body;
  const newPost = { imageLink, description, comments: [] };
  posts.push(newPost);
  res.redirect('/');
});

app.post('/add-comment/:postId', (req, res) => {
  const { postId } = req.params;
  const { comment } = req.body;
  posts[postId].comments.push(comment);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
