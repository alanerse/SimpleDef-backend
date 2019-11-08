const express = require('express');
const SearchController = require('./controllers/SearchController');
const routes = express.Router();

routes.get('/consulta', SearchController.show);

module.exports = routes;
