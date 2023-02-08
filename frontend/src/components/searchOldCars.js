import { useState } from "react"



const CarsOlderThan5 = () => {


    const [oldCars, setoldCars] = useState([])
    const [model, setModel] = useState('')
    const [make, setMake] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [owner, setOwner] = useState('')
  
const handleClick = async () => {
    const response = await fetch('/api/cars/older', {
        method: 'GET'
    })

        const oldCars = await response.json()
        setoldCars(oldCars);
    }

    if (oldCars.length > 1) {
    oldCars.map()
    }
    else()

    return(
        <>
        <button onClick={handleClick}>Search</button>
        <p>Model : {oldCars.model}</p>
        </>
    )

}