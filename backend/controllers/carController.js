const Car = require('../models/carsModel')
const mongoose = require('mongoose')

//GET all cars
const getCars = async (req, res) => {
    const cars = await Car.find({}).sort({createAt:-1})
    
    res.status(200).json(cars)
}
// Get a single car
const getCar = async (req, res) => {
    const { id } = req.params

    console.log("getCar")
    if (!mongoose.Types.ObjectId.isValid(id)) { //if the ID is not correct send this 
        return res.status(404).json({error:'No such car'})
    }
    const car = await Car.findById(id)

    if (!car) {
        return res.status(404).json({error: 'No such car'})
    }

    res.status(200).json(car)
}

//Get/list model, make, regNo and current owner for all cars older that 5 years. 
const getOldCars  = async (req,res) => {
    const cars = await Car.find({model: {$lte: new Date('2017-01-01')}})
    console.log("getOldCars")
    res.status(200).json(cars)
}


//Create new car
const createCar = async (req, res) => { 
    const {model, make, colour, registrationNumber, owner, address} = req.body
    //add doc to db
    try {
        const car = await Car.create({model, make, colour, registrationNumber, owner, address}) //create is asynchronus
        res.status(200).json(car)
    } catch (error) {
        res.status(400).json({error: error.message})
}}
//Delete a car

const deleteCar = async (req, res) => {
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) { //if the ID is not correct send this 
        return res.status(404).json({error:'No such workout'})
    }
    const car = await Car.findOneAndDelete({_id: id})

    if (!car) {
        return res.status(404).json({error: 'No such car'})
    }

    res.status(200).json(car)
}

//update a car
    const updateCar = async (req, res) => {

        console.log(req.body);

        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) { //if the ID is not correct send this 
            return res.status(404).json({error:'No such workout'})
        }

        const car = await Car.findOneAndUpdate({_id: id}, {//findOneAndUpdate is a method from mongoose
            ...req.body//spread the body properties into the object so it updates only what we want 
        }) 

        console.log('Car found by server: ', car ); 
        
        if (!car) {
            return res.status(404).json({error: 'No such car'})
        }

        res.status(200).json(car)
    }
module.exports = {
    getCars,
    getCar,
    createCar,
    deleteCar,
    updateCar,
    getOldCars
}