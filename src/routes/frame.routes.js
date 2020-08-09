const router = require('express-promise-router')();
const frameController = require('../controllers/frame.controller');

// ==> Definindo as rotas do CRUD - 'Frame':

router.get('/frames', frameController.listAllFrames);
router.get('/frame/:id', frameController.findFrame);
router.post('/frame', frameController.createFrame);
router.put('/frame', frameController.updateFrame);
router.delete('/frame/:id', frameController.deleteFrame);
module.exports = router;