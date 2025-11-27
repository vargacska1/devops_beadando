import mongoose from 'mongoose';

const kudoSchema = new mongoose.Schema({
  sender: { type: String, required: true }, 
  recipient: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

export const Kudo = mongoose.model('Kudo', kudoSchema);