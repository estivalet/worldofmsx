
module.exports = (app) => {
    const game = require('../controllers/msxgamesworld.controller.js');

    app.get('/msxgamesworld/index', game.index);

    app.get('/msxgamesworld', game.findAll);
}