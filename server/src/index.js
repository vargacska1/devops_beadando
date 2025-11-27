import mongoose from 'mongoose';
import app from './app.js';

const PORT = process.env.PORT || 3000;
const { DB_USER, DB_PASSWORD, DB_URL, DB_NAME } = process.env;
const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}:${process.env.MONGO_PORT || 27017}/${DB_NAME}?authSource=admin`;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.error('MongoDB connection error:', err));