// pages/api/task.js
import { MongoClient } from 'mongodb';

const client = new MongoClient('mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/Todos?retryWrites=true&w=majority');

async function handler(req, res) {
  await client.connect();
  const db = client.db();
  const taskCollection = db.collection('Todos');

  if (req.method === 'GET') {
    try {
      const tasks = await taskCollection.find({}).toArray();
      res.status(200).json({ tasks });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching tasks', error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      await client.connect();
      const db = client.db();
      const taskCollection = db.collection('Todos');
      const newTask = req.body;
  
      // Insert the task into the database
      const result = await taskCollection.insertOne(newTask);
      
      // If successful, return the task data (including the _id)
      res.status(201).json({ message: 'Task added successfully', task: result.ops[0] });
    } catch (error) {
      console.error('Error adding task:', error); // Log the error for debugging
      res.status(500).json({ message: 'Error adding task', error: error.message });
    } finally {
      client.close();
    }
  }
}

export default handler;
