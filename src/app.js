const express = require('express')
const taskRoutes = require('./routes/taskRoutes')
const listRoutes = require('./routes/listRoutes')

const port = process.env.PORT || 3333
const app = express();

app.use(express.json())
app.use('/tasks', taskRoutes)
app.use('/lists', listRoutes)

app.listen(port, () => {
    console.log('Back-end started on port', port)
});

module.exports = app