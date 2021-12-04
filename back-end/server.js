const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://127.0.0.1:27017/todo', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  message: String,
  priority: Number,
  class: String,
});

const classSchema = new mongoose.Schema({
  name: String,
  date: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);
const Class = mongoose.model('Class', classSchema);

app.post('/api/items', async (req, res) => {
  const item = new Item({
    message: req.body.message,
    priority: req.body.priority,
    class: req.body.class,
  });
  try {
    console.log("Saving item: " + item.message);
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.post('/api/classes', async (req, res) => {
  const classItem = new Class({
    name: req.body.name,
    date: req.body.date,
  });
  try {
    await classItem.save();
    res.send(classItem);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/classes', async (req, res) => {
  try {
    let classes = await Class.find();
    res.send(classes);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
