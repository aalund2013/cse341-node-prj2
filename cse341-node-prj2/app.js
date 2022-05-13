const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRoute = require('./routes/posts');
const userRoute = require('./routes/users');
const swaggerUi = require('swagger-ui-express');
const docRoute = require('./api-docs');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
require('dotenv/config');
require('./models/passport-setup')(passport);
const port = process.env.PORT || 8080;
const app = express();
// .
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
app.engine('.hbs', exphbs.engine({defaultLayout: 'main', extname: '.hbs'}));
app.set('view engine', '.hbs');

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
  // cookie: {secure: true} (doesn't work without https)
}));

// Passport
app.use(passport.initialize());
app.use(passport.session());
// Static folder
app.use(express.static(path.join(__dirname, 'public')));

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

// Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/posts', postRoute);
app.use('/users', userRoute);
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

mongoose.connect(
  process.env.MONGODB_URI,{ UseNewUrlParser: true },
  () => console.log('connected to DB...')
);

app.listen(port);