const express = require('express');
const app = express();
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node", completed: false },
  { id: 2, task: "Build API", completed: true }
];

app.get('/todos', (req, res) => {
  res.json(todos);
});

// BONUS - must be BEFORE :id
app.get('/todos/active', (req, res) => {
  res.json(todos.filter(t => !t.completed));
});

// TASK 1 - single todo
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id == req.params.id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  res.json(todo);
});

// TASK 2 - validation
app.post('/todos', (req, res) => {
  if (!req.body.task) {
    return res.status(400).json({ error: '"task" field is required' });
  }
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    completed: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const t = todos.find(t => t.id == req.params.id);
  if (!t) return res.status(404).json({ error: 'Not found' });
  if (req.body.task) t.task = req.body.task;
  if (req.body.completed !== undefined) t.completed = req.body.completed;
  res.json(t);
});

app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id != req.params.id);
  res.json({ message: 'Deleted' });
});

app.listen(3002, () => console.log('Server on 3002'));
