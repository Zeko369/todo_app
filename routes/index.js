var express = require('express');
var router = express.Router();

const controllers = require('../controllers');
const todosController = new controllers.TodosController(`/api/todos`);
const tasksController = new controllers.TasksController(`/api/todos/:id/tasks`);

todosController.mount('/tasks', true, tasksController);
router.use('/api/todos', todosController.getRouter());

module.exports = router;
