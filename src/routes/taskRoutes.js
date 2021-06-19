const express = require('express');
const { v4 } = require('uuid');
const router = express.Router()

const tasks = []

router.get('/', (req, res) => {
  const { listId } = req.query
  
  const results = listId
    ? tasks.filter(task => task.listId.includes(listId))
    : tasks

  return res.json(results);
});

router.post('/', (req, res) => {
  const { description, done, listId } = req.body

  const taskIndex = tasks.findIndex(task =>  task.listId === req.query.listId)

  if (taskIndex < 0) {
    return res.status(400).json({ error: 'Task not found' })
  }
 
  const task = {
    id: v4(),
    listId,
    description,
    done
  }
  tasks.push(task)

  return res.json(task)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { description, done, listId } = req.body

  const taskIndex = tasks.findIndex(task => task.id == id && task.listId == listId)

  if (taskIndex < 0) {
    return res.status(400).json({ error: 'Task not found' })
  }

  const task = {
    id,
    listId,
    description,
    done,  
  }
  tasks[taskIndex] = task

  return res.json(task)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const taskIndex = tasks.findIndex(task => task.id == id)

  if (taskIndex < 0) {
    return res.status(400).json({ error: 'Task not found' })
  }

  tasks.splice(taskIndex, 1)

  return res.status(204).send()
})

module.exports = router