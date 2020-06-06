// @ts-check
const BaseController = require('./baseController');

const { Todo } = require('../models');
const { Task } = require('../models');

const queryTodo = (id, includeTasks = false, findAll = false) => {
  return Todo[findAll ? 'findAll' : 'findOne']({
    ...(findAll ? {} : { where: { id } }),
    include: includeTasks
      ? [
          {
            model: Task,
            as: 'tasks',
          },
        ]
      : [],
    order: [['createdAt', 'DESC']],
  });
};

class TodosContoller extends BaseController {
  constructor(...props) {
    super(...props);
  }

  listTodos = () => ({
    route: 'get /',
    callback: async (req, res) => {
      try {
        const todos = await queryTodo(undefined, true, true);

        res.status(200).send(todos);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });

  createTodo = () => ({
    route: 'post /',
    callback: async (req, res) => {
      try {
        const todo = await Todo.create({
          title: req.body.title,
          description: req.body.description,
        });
        res.status(201).send(todo);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });

  getTodo = () => ({
    route: 'get /:id',
    callback: async (req, res) => {
      try {
        const todo = await queryTodo(req.params.id, true);

        if (!todo) {
          return res.status(404).send({
            error: true,
            error_type: 'Not found',
          });
        }

        return res.status(200).send(todo);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });

  checkTodo = () => ({
    route: 'patch /:id/check',
    callback: async (req, res) => {
      try {
        const todo = await queryTodo(req.params.id);
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }

        await todo.update({
          checked: !todo.checked,
          checkedAt: todo.checked ? null : new Date(),
        });

        res.status(200).send(todo);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });

  updateTodo = () => ({
    route: 'patch /:id',
    callback: async (req, res) => {
      try {
        const todo = await queryTodo(req.params.id, true);
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }

        let description = '';
        if (req.body.description === null) {
          description = null;
        } else {
          description = req.body.description || todo.description;
        }

        await todo.update({
          title: req.body.title || todo.title,
          description: description,
        });

        res.status(200).send(todo);
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });

  deleteTodo = () => ({
    route: 'delete /:id',
    callback: async (req, res) => {
      try {
        const todo = await Todo.findByPk(req.params.id);
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        await todo.destroy();
        res.status(204).send();
      } catch (err) {
        res.status(500).send(err);
      }
    },
  });
}

module.exports = TodosContoller;
