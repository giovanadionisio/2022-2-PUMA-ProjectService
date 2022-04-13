const express = require('express');

const routes = express.Router();
const keywordController = require('../controller/KeywordController');

routes.get('/keywords', (req, res) => {
    keywordController.getAllKeywords().then((response) => {
        res.status(200).json(response);
    }).catch((error) => {
        res.status(400).json(error);
    });
});

module.exports = routes;
