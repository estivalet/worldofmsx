module.exports = (app) => {
    const msx_controller = require('../controllers/msx.controller');
    
    app.get('/', msx_controller.index);    
}
