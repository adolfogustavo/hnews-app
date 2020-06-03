const express = require('express');
const NewsController = require('./../controllers/news');

const api = express.Router();

api.post("/deleteNew", NewsController.deleteNew);
api.get("/getNews", NewsController.getNews);

module.exports = api;