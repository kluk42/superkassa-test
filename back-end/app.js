const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./routes/index.js');
const errorsCentral = require('./middlewares/errors');

const { PORT = 4000 } = process.env;
const app = express();
app.use(helmet());
app.use(cors());

const mongodbUrl = 'mongodb://localhost:27017/superkassa';

mongoose.connect(mongodbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', router);

app.use((err, req, res, next) => {
  errorsCentral(err, req, res, next);
  next();
});

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  // console.log(`App listening on port ${PORT}`);
});

module.exports = app;
