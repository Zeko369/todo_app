var express = require('express');
var router = express.Router();

const TodosController = require('../controllers/todos_controller');
const todosController = new TodosController();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use('/api/', todosController.getRouter());

/* Classroom Router */
// router.get('/api/todos', todosController.list);
// router.get('/api/todo/:id', todosController.show);
// router.post('/api/todos', todosController.create);
// router.patch('/api/todo/:id', todosController.update);
// router.patch('/api/todo/:id/check', todosController.check);
// router.delete('/api/todo/:id', todosController.destroy);

module.exports = router;
