const { uuid } = require('uuidv4')
const express = require('express');
const { v4 } = require('uuid');

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
    id: v4(),
    title
  }
  lists.push(list)

  return res.json(list)
})

router.put('/:id', (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const listIndex = lists.findIndex(list => list.id == id)

  if (listIndex < 0) {
    return res.status(400).json({ error: 'List not found' })
  }

  const list = {
    id,
    title
  }
  lists[listIndex] = list

  return res.json(list)
})

router.delete('/:id', (req, res) => {
  const { id } = req.params
  const listIndex = lists.findIndex(list => list.id == id)

  if (listIndex < 0) {
    return res.status(400).json({ error: 'List not found' })
  }

  lists.splice(listIndex, 1)

  return res.status(204).send()
})

module.exports = router