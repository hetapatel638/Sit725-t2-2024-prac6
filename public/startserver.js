const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect('mongodb+srv://patelheta2512:YEDYygz8oo3lWfOD@cluster0.m9uqp.mongodb.net/budgetControl?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

// Schema and Model
const DataSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  description: String,
  time: String
});

const Data = mongoose.model('Data', DataSchema);

// Route to handle form submission
app.post('/submit', (req, res) => {
  const newData = new Data({
    name: req.body.name,
    amount: req.body.amount,
    description: req.body.description,
    time: req.body.time
  });

  newData.save((err) => {
    if (err) {
      res.status(500).send('Error saving data');
    } else {
      res.status(200).send('Data saved successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});