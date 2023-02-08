require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const carsRoutes = require('./routes/cars')
mongoose.set('strictQuery', false) // this line is because i got the bellow error 
/* 
(node:9748) [MONGOOSE] DeprecationWarning: Mongoose: the `strictQuery` option will be 
switched back to `false` by default in Mongoose 7. Use `mongoose.set('strictQuery', false);` 
if you want to prepare for this change. Or use `mongoose.set('strictQuery', true);` to suppress this warning.
*/

// express app
const app = express()

// middleware use method to use middleware 
app.use(express.json()) //checks if there is body in a req and if so it parses it and attaches it to the req object so we can access it in the req handler

app.use((req, res, next) => { //next must run to move to next middleware
  console.log(req.path, req.method)
  next() //if we dont run this function then the app will stop and not run the next code 
})

// routes
app.use('/api/cars', carsRoutes)

// Connect to DB
mongoose.connect(process.env.MONGO_URI) //asynchronus 
  .then(() => {
      // listen for requests
  app.listen(process.env.PORT, () => {
    console.log('connected to DB and listening on port', process.env.PORT)
  })
  })
  .catch((error) => {
    console.log(error)
  })
