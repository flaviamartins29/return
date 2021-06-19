const { uuid } = require('uuidv4')
const express = require('express')

const router = express.Router()
const lists = [] 

router.get('/', (req, res) => {
  const { title } = req.query

  const results = title
    ? lists.filter(list => list.title.includes(title))
    : lists

  return res.json(results);
});

router.post('/', (req, res) => {
  const { title } = req.body

  const list = {
    id: uuid(),
    title,
    tasks: []
  }
  lists.push(list)

  return res.json(list)
})

router.post('/:listId/tasks', (req, res) =>{
  const { listId } = req.params
  const { description, done } = req.body 

  const task = {
    taskId: uuid(), 
    description,
    done,
  }

  const list = lists.find(list => list.id === listId)
  if(list === undefined) {
    return res.status(400).json({ erro: 'List not found.' })
  }
  list.tasks.push(task)
  
  return res.json(list)
  
})


router.put('/:listId', (req, res) => {
  const { listId } = req.params
  const { title } = req.body

  const listIndex = lists.findIndex(list => list.id == listId)

  if (listIndex < 0) {
    return res.status(400).json({ error: 'List not found' })
  }

  const list = {
    id: listId,
    title
  }
  lists[listIndex] = list

  return res.json(list)
})

router.delete('/:listId', (req, res) => {
  const { listId } = req.params

  const listIndex = lists.findIndex(list => list.id === listId)

  if (listIndex < 0) {
    return res.status(400).json({ error: 'List not found' })
  }

  lists.splice(listIndex, 1)

  return res.status(204).send()
})


router.delete('/:listId/tasks/:taskId', (req, res) => {
const { listId, taskId } = req.params

const list = lists.find(list => list.id === listId)  
const taskIndex = list.tasks.findIndex(task => task.taskId === taskId)

  if(taskIndex === undefined) {
    return res.status(400).json({ erro: 'List not found.' })
  } 
  
  list.tasks.splice(taskIndex, 1)

  return res.status(204).send()

})

module.exports = router