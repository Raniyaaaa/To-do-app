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
    const newTask = req.body;

    if (!newTask.text) {
      return res.status(400).json({ error: 'Task text is required' });
    }

    try {
      await client.connect();
      const db = client.db();
      const taskCollection = db.collection('Todos');
      
      const result = await taskCollection.insertOne(newTask);

      res.status(201).json({ task: { ...newTask, _id: result.insertedId } });
    } catch (error) {
      console.error('Error adding task:', error);
      res.status(500).json({ error: 'Failed to add task' });
    } finally {
      await client.close();
    }
  }
}

export default handler;
