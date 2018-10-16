
module.exports = (app) => {
    const game = require('../controllers/game.controller.js');

    app.get('/games', game.list);
}