const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const loginRoutes = require('./src/routes/login')
const { graphqlHTTP } = require('express-graphql')
const graphSchema = require('./src/graphql/index');
require('./src/utils/connectdb')

const port = 8080
app.use(cors({ origin: 'http://localhost:3000' }))
app.use(cookieParser())
app.use(bodyParser.json())
app.use(cookieParser('secret'))
app.use('/graphql',graphqlHTTP({
  graphiql: true,
  schema: graphSchema 
}))
app.use(loginRoutes)

app.listen(port, () => {
  console.log('listenning on port : ', port)
})
