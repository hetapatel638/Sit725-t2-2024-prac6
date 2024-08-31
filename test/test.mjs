import pkg from 'mongodb';
const { MongoClient } = pkg;
import { expect } from 'chai';
import Data from '../models/data.mjs'; // Adjust the path and extension as necessary

describe('Data class', () => {
  let connection;
  let db;
  let data;

  before(async () => {
    connection = await MongoClient.connect('mongodb+srv://patelheta2512:YEDYygz8oo3lWfOD@cluster0.m9uqp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db('jest');
    data = new Data(db);
  });

  after(async () => {
    await connection.close();
  });

  beforeEach(async () => {
    await db.collection('expenses').deleteMany({});
  });

  it('addExpense should insert a new expense', async () => {
    const expense = { name: 'Test Expense', amount: 100, description: 'Test Description', time: '12:00' };
    await data.addExpense(expense);

    const insertedExpense = await db.collection('expenses').findOne({ name: 'Test Expense' });
    expect(insertedExpense).to.include({
      name: 'Test Expense',
      amount: 100,
      description: 'Test Description',
      time: '12:00'
    });
  });

  it('getExpenses should return all expenses', async () => {
    const expenses = [
      { name: 'electronics', amount: 50, description: 'KMart', time: '10:00 AM' },
      { name: 'groceries', amount: 150, description: 'Coles', time: '02:00 PM' },
    ];
    await db.collection('expenses').insertMany(expenses);

    const fetchedExpenses = await data.getExpenses();
    expect(fetchedExpenses).to.deep.include.members(expenses);
  });
});
