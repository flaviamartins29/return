const { uuid } = require('uuidv4')
const express = require('express')


const router = express.Router()
const lists = []

router.get('/', (req, res) => {
  const { title } = req.query

  const results = title
    ? lists.filter(list => list.title.includes(title))
    : lists

  return res.json(results)
})

router.get('/home', (req, res) => {
  const titles = lists.map(list => ({ title: list.title, id: list.id, done: list.done }))

  return res.render('home', { titles })
})

router.get('/:id', (req, res) => {
  const { id } = req.params
  const list = lists.find(list => list.id === id)

  if (!list) {
    return res.status(404).json({ erro: 'List not found.' })
  }
  return res.render('list', { list })
})

router.post('/', (req, res) => {
  const { title } = req.body

  const list = {
    id: uuid(),
    title,
    tasks: []
  }
  lists.push(list)

  return res.redirect('/lists/home')
})

router.post('/:listId/tasks', (req, res) => {
  const { listId } = req.params
  const { description, done } = req.body

  const task = {
    taskId: uuid(),
    description,
    done,
  }

  const list = lists.find(list => list.id === listId)
  if (!list) {
    return res.status(404).json({ erro: 'List not found.' })
  }
  list.tasks.push(task)

  return res.redirect("/lists/" + listId)

})

router.put('/:listId', (req, res) => {
  const { listId } = req.params
  const { title } = req.body

  const listIndex = lists.findIndex(list => list.id === listId)

  if (listIndex < 0) {
    return res.status(404).json({ error: 'List not found' })
  }

  const list = {
    id: listId,
    title,
  }
  lists[listIndex] = list

  return res.json(list)
})

router.put('/:listId/tasks/:taskId', (req, res) => {
  const { listId, taskId } = req.params
  const { description, done } = req.body

  const list = lists.find(list => list.id === listId)
  if (!list) {
    return res.status(404).json({ error: 'List not found' })
  }

  const taskFind = list.tasks.findIndex(task => task.taskId === taskId)
  if (taskFind < 0) {
    return res.status(404).json({ error: 'Task not found' })
  }

  const task = {
    taskId: taskId,
    description,
    done
  }
  list.tasks[taskFind] = task

  return res.redirect("/lists/" + listId)
})


router.delete('/:listId', (req, res) => {
  const { listId } = req.params

  const listIndex = lists.findIndex(list => list.id === listId)

  if (listIndex < 0) {
    return res.status(404).json({ error: 'List not found' })
  }

  lists.splice(listIndex, 1)

  return res.status(204).send()
})

router.delete('/:listId/tasks/:taskId', (req, res) => {
  const { listId, taskId } = req.params

  const list = lists.find(list => list.id === listId)
  const task = list.tasks.findIndex(task => task.taskId === taskId)

  if (task < 0) {
    return res.status(404).json({ erro: 'List not found.' })
  }

  list.tasks.splice(task, 1)

  return res.status(204).send()

})

module.exports = router