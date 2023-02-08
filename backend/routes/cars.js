const express = require('express')
const {
    createCar,
    getCar,
    getCars,
    deleteCar,
    updateCar,
    getOldCars
} = require('../controllers/carController')

const router = express.Router()
//get cars older than 5 years
router.get('/older', getOldCars) //must be placed above get a car because otherwise older is seen as an id 

// GET all cars
router.get('/', getCars)

//GET a single car
router.get('/:id', getCar)

//POST A NEW CAR
router.post('/', createCar)


//DELETE A  CAR
router.delete('/:id',deleteCar)

//update a CAR
//using patch instead of put becuase i just want to update the given fields not rewrite the whole thing 
router.patch('/:id', updateCar)



module.exports = router