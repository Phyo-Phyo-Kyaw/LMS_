const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const i18n = require("i18n");

i18n.configure({
  locales: ['en', 'mm'],
  directory: __dirname + '/locales',
  defaultLocale: 'en',
  queryParameter: 'lang',
  cookie: 'locale',
  autoReload: true,
  updateFiles: false
});

app.use(i18n.init);
app.use(cookieParser());

app.use((req, res, next) => {
  const lang = req.cookies.lang || 'en'; 
  req.setLocale?.(lang); 
  res.locals.lang = lang; 
  next();
});


// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ✅ Session config — MUST come before route handlers
app.use(session({
  secret: process.env.SESSION_SECRET || 'mydefaultsecret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }  // Set to true only if using HTTPS
}));

// View engine
app.set('view engine', 'ejs');
app.use(expressLayouts); // Enable layout support
app.set('layout', 'layout');

// ✅ Routes (after session setup)
const authRoutes = require('./routes/auth');
const courseRoutes = require('./routes/courses');
const newsRoutes = require('./routes/news');
const eventsRoutes = require('./routes/events');
const scheduleRoutes = require('./routes/schedule');
app.use('/', authRoutes);
app.use('/courses', courseRoutes);
app.use('/news', newsRoutes);
app.use('/events', eventsRoutes);
app.use('/schedule', scheduleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
