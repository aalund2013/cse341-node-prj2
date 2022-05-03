const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');
const swaggerUi = require('swagger-ui-express');
const docRoute = require('./routes/api-docs');
require('dotenv/config');

const port = process.env.PORT || 8080;
const app = express();

const multer = require('multer');
  
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
  
const upload = multer({ storage: storage });
// const imgModel = require('./models');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use('/posts', postRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docRoute));

mongoose.connect(
  process.env.MONGODB_URI,{ UseNewUrlParser: true },
  () => console.log('connected to DB...')
);

app.listen(port);