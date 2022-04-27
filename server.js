const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const homeRouter = require('./routes/home');
const reviewRouter = require('./routes/review');
const bookRouter = require('./routes/book');
const userRouter = require('./routes/user');

const mongooseEnpoint = 'mongodb://127.0.0.1/book_reviews';

mongoose.connect(mongooseEnpoint, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const cors = require('cors');
const auth_middleware = require('./routes/middleware/auth_middleware');

app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
  origin: '*',
}));

// app.use(auth_middleware);
app.use('/api/review', reviewRouter);
app.use('/api/home', homeRouter);
app.use('/api/book', homeRouter);
app.use('/api/user', userRouter);

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});