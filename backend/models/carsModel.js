const mongoose = require("mongoose")

const Schema = mongoose.Schema //so i dont have to type mongoose. everytime i want to invoke it 

const carsSchema = new Schema({
    model:{
        type: Date,
        required: true
    },
    make:{
        type: String,
        required: true
    },
    colour: {
        type : String,
        required: true
    },
    registrationNumber: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, {timestamps: true}); // this object adds created at property to each object

// module.exports makes the model available outside of your module
// The first argument for mongoose.model should be the name of the
// document in your MongoDB collection (remember that spelling
// is important, this includes casing)

module.exports = mongoose.model('Car', carsSchema); //mongoose pluralises the car to cars by itself 
