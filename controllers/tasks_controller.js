const BaseController = require('./baseController');

const { Todo } = require('../models');
const { Task } = require('../models');

class TasksController extends BaseController {
  constructor(...props) {
    super(...props);
  }

  createTask = () => ({
    route: 'post /:todoId/task',
    callback: async (req, res) => {
      try {
        const todo = await Todo.findByPk(req.params.todoId);
        if (!todo) {
          return res.status(404).send({
            error: true,
            error_type: 'Not found',
          });
        }

        if (!req.body.text) {
          return res.status(401).send({ error: true, error_type: 'Missing text' });
        }

        const task = await Task.create({
          TodoId: req.params.todoId,
          text: req.body.text,
        });

        return res.status(200).send(task);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });
}

module.exports = TasksController;
