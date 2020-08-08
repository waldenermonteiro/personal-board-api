const router = require('express-promise-router')();
const taskController = require('../controllers/task.controller');

// ==> Definindo as rotas do CRUD - 'Task':

router.get('/task/:id', taskController.findTaskById);
router.post('/task', taskController.createTask);
router.put('/task', taskController.updateTask);
router.delete('/task', taskController.deleteTask);
module.exports = router;