const express = require('express');
const cookieParser = require("cookie-parser");
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todo.routes');
const listRoutes = require('./routes/list.routes');
const tagRoutes = require('./routes/tag.routes');
const authRoutes = require('./routes/auth.routes');
const seedData = require('./seeds/runSeeds');

const app = express();
const PORT = process.env.PORT || 5001;

(async () => {
  await connectDB();
  await seedData();
})();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ message: 'Task Manager API is Running!!' });
});

app.use('/api/auth', authRoutes);
app.use('/api/lists', listRoutes);
app.use('/api/tags', tagRoutes);
app.use('/api/todos', todoRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route Not Found!!' });
});

app.listen(PORT, () => {
  console.log(`Server is Running on Port ${PORT}`);
});
