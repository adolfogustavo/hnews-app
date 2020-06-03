const express = require('express');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const NewsController = require('./controllers/news');

const app = express();
const { API_VERSION } = require('./config');

cron.schedule('0 * * * *', () => {
  NewsController.updateNews();
  console.log('The news has been updated');
});

// Load routings
const newRoutes = require("./routers/news");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Configure Header HTTP
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
  });

// Router Basic
app.use(`/api/${API_VERSION}`, newRoutes);


// redirect all the non-api routes to react frontend
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '../client','build','index.html'));
});

module.exports = app;