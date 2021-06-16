const { uuid } = require('uuidv4')
const express = require ('express');

const app = express();

app.use(express.json())

const toDoList = []

app.get('/', (req, res) => {
    const {description} = req.query
    
    const results = description
      ? toDoList.filter(task => task.description.includes(description))
      : toDoList

    return res.json(results);
});

app.post('/', (req, res) =>{
    const {description, done} = req.body
    
    const task = {
        id: uuid(),
        description, 
        done
    }
    toDoList.push(task)
    
    return res.json(task)
})

app.put('/:id', (req, res) =>{
    const {id} = req.params
    const {description, done} = req.body

    const taskIndex = toDoList.findIndex(task => task.id == id)
    
    if (taskIndex < 0){
        return res.status(400).json({error: 'Task not found'})
    }

    const task = {
        id,
        description,
        done
    }
    toDoList[taskIndex] = task

    return res.json(task)
    
})

app.delete('/:id', (req, res) =>{
    const { id } = req.params
    const taskIndex = toDoList.findIndex(task => task.id == id)
    
    if (taskIndex < 0){
        return res.status(400).json({error: 'Task not found'})
    }

    toDoList.splice(taskIndex, 1)

    return res.status(204).send()
})
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log('Back-end started on port', port)
});