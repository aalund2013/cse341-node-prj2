const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');
const swaggerUi = require('swagger-ui-express');
const docRoute = require('./api-docs');
const morgan = require('morgan');
require('dotenv/config');

const port = process.env.PORT || 8080;
const app = express();

// const multer = require('multer');
  
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// });
  
// const upload = multer({ storage: storage });
// const imgModel = require('./models');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS error handling
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});


app.use('/posts', postRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docRoute));

app.use((req, res, next) => {
  const error = new Error('Not found');
  err.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// process.on('uncaughtException',(err,origin) => {
//   console.log(process.stderr.fd, 'Caught exception: ${err}\n' + 'Exception origin: ${origin}');
// });

mongoose.connect(
  process.env.MONGODB_URI,{ UseNewUrlParser: true },
  () => console.log('connected to DB...')
);

app.listen(port);