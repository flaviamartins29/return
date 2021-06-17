const { uuid } = require('uuidv4')
const express = require('express');

const routes = require('./routes/routes')

const app = express();
app.use(express.json())


app.use('/', routes)
app.use('/', routes)
app.use('/:id', routes)
app.use('/:id', routes)

const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log('Back-end started on port', port)
});


module.exports = app