const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const Data = require('./models/data');

const app = express();
const port = 3000;

const url = 'mongodb+srv://patelheta2512:YEDYygz8oo3lWfOD@cluster0.m9uqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const dbName = 'mydatabase';

MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        return console.error(err);
    }
    console.log('Connected successfully to MongoDB server');

    const db = client.db(dbName);
    const data = new Data(db);

    app.use(express.json());
    app.use(express.static(path.join(__dirname, 'public')));

    app.post('/expenses', async (req, res) => {
        const { name, amount, description, time } = req.body;
        await data.addExpense({ name, amount, description, time });
        res.sendStatus(200);
    });

    app.get('/expenses', async (req, res) => {
        const expenses = await data.getExpenses();
        res.json(expenses);
    });

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});