const express = require('express');
const app = express();
app.use(express.json());

let items = [];
let idCounter = 1;

// Create Operation
app.post('/items', (req, res) => {
  const item = { id: idCounter++, ...req.body };
  items.push(item);
  res.status(201).json(item);
});

// Read Operation (All items)
app.get('/items', (req, res) => {
  res.json(items);
});

// Read Operation (Single item)
app.get('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  res.json(item);
});

// Update Operation
app.put('/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  if (!item) {
    return res.status(404).json({ error: 'Item not found' });
  }
  const updatedItem = { ...item, ...req.body };
  items = items.map(i => (i.id === parseInt(req.params.id) ? updatedItem : i));
  res.json(updatedItem);
});

// Delete Operation
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(i => i.id === parseInt(req.params.id));
  if (itemIndex === -1) {
    return res.status(404).json({ error: 'Item not found' });
  }
  items.splice(itemIndex, 1);
  res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
