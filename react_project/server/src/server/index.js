var express = require('express')

module.exports = {
    create: () => express().set('json spaces', 2),
    defaults: require('./defaults'),
    router: require('./router'),
    rewriter: require('./rewriter'),
    bodyParser: require('./body-parser')
}

var data = {
    movies: [{
        id: 1,
        actors: [1]
    }],
    actors: [{
        id: 1,
        name: 'BIba',
    }]
};

data.movies.map(m => {
  var calculatedActorsIds = m.actors.map(aName => data.actors.find(a => a.name === aName).id);

  return { ...m, actors: calculatedActorsIds}
})