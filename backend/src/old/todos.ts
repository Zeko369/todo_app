import { Router } from 'express';
import db from '../db';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const todos = await db.todos.findMany();
    res.status(200).send(todos);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const todo = await db.todos.create({
      data: {
        title: req.body.title,
        description: req.body.description,
      },
    });
    res.status(201).send(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await db.todos.findOne({ where: { id } });

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
});

router.patch('/:id/check', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await db.todos.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).send({
        message: 'Todo Not Found',
      });
    }

    await db.todos.update({
      where: { id },
      data: {
        checked: !todo.checked,
        checkedAt: todo.checked ? null : new Date(),
      },
    });

    res.status(200).send(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await db.todos.findOne({ where: { id } });

    if (!todo) {
      return res.status(404).send({
        message: 'Todo Not Found',
      });
    }

    let description: null | string = '';
    if (req.body.description === null) {
      description = null;
    } else {
      description = req.body.description || todo.description;
    }

    await db.todos.update({
      where: { id },
      data: {
        title: req.body.title || todo.title,
        description: description,
      },
    });

    res.status(200).send(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const todo = await db.todos.findOne({ where: { id } });

    if (!todo) {
      return res.status(400).send({
        message: 'Todo Not Found',
      });
    }

    await db.todos.delete({ where: { id } });
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

export default router;
