const express = require('express');
const app = express();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let todos = [];
let idCounter = 1;

// Show all todos
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Get todos as JSON
app.get('/todos', (req, res) => {
  res.json(todos);
});

// Add a new todo
app.post('/add', (req, res) => {
  const task = req.body.task;
  if (task && task.trim() !== '') {
    todos.push({ id: idCounter++, task: task.trim(), done: false });
  }
  res.redirect('/');
});

// Mark as done
app.post('/done/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (todo) todo.done = !todo.done;
  res.redirect('/');
});

// Delete a todo
app.post('/delete/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(t => t.id !== id);
  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});