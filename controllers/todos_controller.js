const Todo = require('../models').Todo;
const Task = require('../models').Task;

module.exports = {
  list(req, res) {
    return Todo
      .findAll({
        include: [{
          model: Task,
          as: 'tasks'
        }],
        order: [
          ['createdAt', 'DESC']
        ],
      })
      .then((todos) => res.status(200).send(todos))
      .catch((error) => { res.status(400).send(error); });
  },

  show(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then((todo) => {
        if (!todo) {
          return res.status(200).send({
            error: true,
            error_type: 'Not found'
          });
        }
        return res.status(200).send(todo);
      })
      .catch((error) => res.status(400).send(error));
  },

  create(req, res) {
    console.log(req.body);
    return Todo
      .create({
        title: req.body.title,
        description: req.body.description,
      })
      .then((todo) => res.status(201).send(todo))
      .catch((error) => res.status(400).send(error));
  },

  check(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .update({
            checked: !todo.checked,
            checkedAt: todo.checked ? null : new Date
          })
          .then(() => res.status(200).send(todo))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(404).send({
            message: 'Todo Not Found',
          });
        }
        let description = '';
        if(req.body.description === null){
          description = null
        } else {
          description = req.body.description || todo.description;
        }

        console.log(req.body.description);
        console.log(description);

        return todo
          .update({
            title: req.body.title || todo.title,
            description: description,
          })
          .then(() => res.status(200).send(todo))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Todo
      .findByPk(req.params.id)
      .then(todo => {
        if (!todo) {
          return res.status(400).send({
            message: 'Todo Not Found',
          });
        }
        return todo
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
