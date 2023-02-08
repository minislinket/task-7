import { useState, useEffect} from "react"



const CarsOlderThan5 = () => {


    const [oldCars, setoldCars] = useState(null)

    useEffect(() => {   
        const getCars = async () => {
            const response = await fetch('/api/cars/older', {
                method: 'GET'
            })

                const oldCars = await response.json()
                setoldCars(oldCars);
               
        }
        getCars()
    }, []) 
            
        
            return(
                <div className="workouts">
                    <h2>Cars older than 5 years from feb 2023</h2>
                    {oldCars && oldCars.map((oldCar) => ( 
                    <div className="workout-details">
                        <p key={oldCar._id}>Model : {oldCar.model}</p>
                        <p>Make : {oldCar.make}</p>
                        <p>Registration number : {oldCar.registrationNumber}</p>
                        <p>Current Owner : {oldCar.owner}</p>
                    </div>
                    ))}
                </div>
                
                
            )

        }

export default CarsOlderThan5;