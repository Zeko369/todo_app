const BaseController = require('./baseController');

const { Todo } = require('../models');
const { Task } = require('../models');

class TasksController extends BaseController {
  constructor(...props) {
    super(...props);
  }

  _loadTodo = async (req, res) => {
    const todo = await Todo.findOne({
      where: { id: req.params.id },
      include: [
        {
          model: Task,
          as: 'tasks',
        },
      ],
    });

    if (!todo) {
      res.status(404).send({
        error: true,
        error_type: 'Not found',
      });
      return null;
    }

    return todo;
  };

  listTasks = () => ({
    route: 'get /',
    callback: async (req, res) => {
      try {
        const todo = await this._loadTodo(req, res);
        if (todo === null) {
          return;
        }

        return res.status(200).send(todo.tasks);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });

  createTask = () => ({
    route: 'post /',
    callback: async (req, res) => {
      try {
        const todo = await this._loadTodo(req, res);
        if (todo === null) {
          return;
        }

        if (!req.body.text) {
          return res.status(401).send({ error: true, error_type: 'Missing text' });
        }

        const task = await Task.create({
          TodoId: todo.id,
          text: req.body.text,
        });

        return res.status(200).send(task);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });

  updateTask = () => ({
    route: 'patch /:taskId',
    callback: async (req, res) => {
      try {
        const task = await Task.findOne({ where: { id: req.params.taskId } });
        if (task === null) {
          return;
        }

        const { text, completed } = req.body;

        if (text) {
          task.text = text;
        }

        if (task.completedAt && completed === false) {
          task.completedAt = null;
        } else if (task.completedAt === null && completed === true) {
          task.completedAt = new Date();
        }

        await task.save();

        return res.status(201).send(task);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });
}

module.exports = TasksController;
