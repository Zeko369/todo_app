var express = require('express');
var router = express.Router();

const controllers = require('../controllers');
const todosController = new controllers.TodosController(`/api/todos`);
const tasksController = new controllers.TasksController(`/api/todos`);

router.use('/api/todos', todosController.getRouter());
router.use('/api/todos/:todoId', tasksController.getRouter());

module.exports = router;
