import { useCarsContext } from "../hooks/useCarsContext"
import { useState } from "react"


const CarDetails = ({car}) => {

    //initialize state for car constituents
    const [model, setModel] = useState('')
    const [make, setMake] = useState('')
    const [colour, setColour] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [owner, setOwner] = useState('')
    const [address, setAddress] = useState('')
    
    

    const {dispatch} = useCarsContext()
    
    const update = async(e) => {
        e.preventDefault()
        
        const carEdit = {
            model: model !== car.model && model ? model : car.model, 
            make: make !== car.make && make ? make : car.make, 
            colour: colour !== car.colour && colour ? colour : car.colour, 
            registrationNumber: registrationNumber !== car.registrationNumber && registrationNumber ? registrationNumber : car.registrationNumber, 
            owner: owner !== car.owner && owner ? owner : car.owner, 
            address: address !== car.address && address ? address : car.address
        }
        
        console.log('The car we want to update: ', carEdit);
        const response = await fetch('/api/cars/'+ car._id, {
            method: 'PATCH',
            body: JSON.stringify(carEdit),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        console.log(" line 33 ID" + car._id)
        console.log("json" + JSON.stringify(json))
        if(response.ok) {
            dispatch({type:'PATCH_CAR', payload: json})
            
        }
    }
    
    
    

    const handleClick = async () => {
        const response = await fetch('/api/cars/' + car._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if(response.ok ) {
            dispatch({type: 'DELETE_CAR', payload: json})
        }
    }
    return (
        
        <div className="workout-details">
            <h4>Model: {car.model} </h4>
            <input 
            defaultValue={car.model}
            type="date"
            onChange={(e) => setModel(e.target.value)}
            />
            <h4>Make: {car.make}</h4>
            <input
            defaultValue={car.make}
            type="text"
            onChange={(e) => setMake(e.target.value)}
            />
            <h4>Colour: {car.colour}</h4>
            <input 
            defaultValue={car.colour}
            type="text"
            onChange={(e) => setColour(e.target.value)}
            />
            <h4>REG: {car.registrationNumber}</h4>
            <input 
            defaultValue={car.registrationNumber}
            type="text"
            onChange={(e) => setRegistrationNumber(e.target.value)}
            />
            <h4>Owner: {car.owner}</h4>
            <input 
            defaultValue={car.owner}
            type="text"
            onChange={(e) => setOwner(e.target.value)}
            />
            <h4>Address: {car.address}</h4>
            <input 
            defaultValue={car.address}
            type="text"
            onChange={(e) => setAddress(e.target.value)}
            />
            <span onClick={handleClick}>delete</span>
            <button onClick={update}>Update</button>
            
        </div>
    )
}

export default CarDetails;