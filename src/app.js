const express = require('express')
const listRoutes = require('./routes/listRoutes')

const port = process.env.PORT || 3333
const app = express();

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')
app.use(express.json())
app.use('/lists', listRoutes)

app.listen(port, () => {
    console.log('Back-end started on port', port)
});

module.exports = app