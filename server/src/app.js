import express from 'express';
import cors from 'cors';
import { Kudo } from './models/Kudo.js';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

app.get('/api/kudos', async (req, res) => {
  try {
    const kudos = await Kudo.find().sort({ timestamp: -1 });
    res.json(kudos);
  } catch (error) {
    res.status(500).json({ error: 'Hiba a lekéréskor' });
  }
});

app.post('/api/kudos', async (req, res) => {
  try {
    const { sender, recipient, message } = req.body;
    if (!recipient || !message) {
      return res.status(400).json({ error: 'Címzett és üzenet kötelező!' });
    }
    const newKudo = new Kudo({ 
      sender: sender || 'Anonim', 
      recipient, 
      message 
    });
    await newKudo.save();
    res.status(201).json(newKudo);
  } catch (error) {
    res.status(500).json({ error: 'Hiba a mentéskor' });
  }
});

export default app;