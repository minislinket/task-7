import { useState } from "react"
import { useCarsContext } from "../hooks/useCarsContext"

const CarForm = () => {
    const {dispatch} = useCarsContext()

    const [model, setModel] = useState('')
    const [make, setMake] = useState('')
    const [colour, setColour] = useState('')
    const [registrationNumber, setRegistrationNumber] = useState('')
    const [owner, setOwner] = useState('')
    const [address, setAddress] = useState('')
    const [error, setError]= useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const car = {model, make, colour, registrationNumber, owner, address}

        const response = await fetch('/api/cars', {
            method: 'POST',
            body: JSON.stringify(car),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
//if error set error
        if (!response.ok) {
            setError(json.error)
        }
        //if ok set error to null (incase there was an error before) and then reset the fields for the next post
        if (response.ok) {
            setModel('')
            setMake('')
            setColour('')
            setRegistrationNumber('')
            setOwner('')
            setAddress('')
            setError(null)
            console.log('new car added', json)
            dispatch({type: 'CREATE_CAR', payload: json})
        }
    }

    return (
        <form  className="create" onSubmit={handleSubmit}>
            <h3>Add a new car</h3>

            <label>Car Owner : </label>
            <input 
                type="text"
                onChange={(e) => setOwner(e.target.value)}
                value={owner} 
            />

            <label>Car Address : </label>
            <input 
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address} 
            />

            <label>Car Model : </label>
            <input 
                type="date"
                onChange={(e) => setModel(e.target.value)}
                value={model} 
            />

            <label>Car Make : </label>
            <input 
                type="text"
                onChange={(e) => setMake(e.target.value)}
                value={make} 
            />

            <label>Car colour : </label>
            <input 
                type="text"
                onChange={(e) => setColour(e.target.value)}
                value={colour} 
            />

            <label>Car REG : </label>
            <input 
                type="text"
                onChange={(e) => setRegistrationNumber(e.target.value)}
                value={registrationNumber} 
            />

            <button>Add Car</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
export default CarForm;