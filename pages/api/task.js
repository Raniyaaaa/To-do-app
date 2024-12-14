
import { MongoClient, ObjectId } from 'mongodb';

const client = new MongoClient('mongodb+srv://RaniyaRasheed:Raniya12345678@cluster0.8qy45.mongodb.net/Todos?retryWrites=true&w=majority');

export default async function handler(req, res) {
  await client.connect();
  const db = client.db();
  const taskCollection = db.collection('Todos');

  if (req.method === 'POST') {
    const newTask = req.body;
    const result = await taskCollection.insertOne(newTask);
    return res.status(201).json({ task: { ...newTask, _id: result.insertedId } });
  } 
  else if (req.method === 'PUT') {
    const { id, status, text } = req.body;
    const result = await taskCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status, text } }
    );
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task updated successfully' });
  } 
  
  else if (req.method === 'DELETE') {
    const { id } = req.body;
    const result = await taskCollection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
