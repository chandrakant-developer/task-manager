const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const listRoutes = require('./routes/listRoutes');
const tagRoutes = require('./routes/tagRoutes');
const seedDefaultData = require('./config/seedData');

const app = express();
const PORT = process.env.PORT || 5001;

(async () => {
  await connectDB();
  seedDefaultData();
})();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ message: 'Task Manager API is Running!!' });
});

app.use('/api/todos', todoRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tags', tagRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found!!' });
});

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
