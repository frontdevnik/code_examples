const express = require('express');
const router = express.Router();
const fs = require('fs');
const log = require( INCPATH + '/log')(module);
const uuid = require('uuid');

let list;
let articles;

fs.readFile('./config/articles.json', 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    list = data;
    list = JSON.parse(list);
    articles = [...list[1].articles, ...list[1].comments];
});

router.get('/list', function(req, res) {
    log.info('==Get all list articles==');
    res.end(JSON.stringify(list));
});

router.get('/articles', function(req, res) {
    log.info('==Get all articles==');
    res.end(JSON.stringify(articles));
});

router.get('/list/:id', function(req, res) {
    log.info('==Get article by id==');
    const articleById = articles.find(article => article.id === req.params.id);
    res.end(JSON.stringify(articleById));
});

router.delete('/deleteArticles', function(req, res) {
    log.info('==Delete all articles==');
    articles = [];
    res.end(JSON.stringify(articles));
});

router.delete('/articles/:id', function(req, res) {
    log.info('==Delete article by id==');
    articles = articles.filter(article => article.id !== req.params.id);
    res.end(JSON.stringify(articles));
});

router.post('/create-article', function(req, res) {
    log.info('==Save article==');
    articles.push(req.body);
    res.end(JSON.stringify(articles));
});

router.put('/create-article/:id', function(req, res) {
    log.info('==Update article==');
    articles = articles.map(article => {
        if(article.id === req.params.id) {
            article.text = req.body.text;
        }
        return article;
    });
    res.end(JSON.stringify(articles));
});

module.exports = router;