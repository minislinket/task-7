import { useEffect, } from "react"
import { useCarsContext } from "../hooks/useCarsContext"


//components
import CarDetails from '../components/carDetails'
import CarForm from "../components/carForm"


const Home = () => {
    const {cars, dispatch} = useCarsContext()

    useEffect(()=> {
        const fetchCars = async () => { //fetch cars from api in back end 
            const response = await fetch('/api/cars') //will only store into res once the fetch has completed fatch(uri)
            const json = await response.json() // parse res into objects into json 

            if (response.ok) {
               dispatch({type:'SET_CARS', payload:json}) // this will fire the carreducer function in carContext.js
            }
        }

        fetchCars(); //call fetch function 
    }, [dispatch])//only fetches when first rendered 
    return (
        <div className="home">
            <div className="workouts">
                {cars && cars.map((car)=> (
                    <CarDetails key={car._id} car={car}/> //car={car} passes the object to home through props
                ))}
            </div>
            
            <CarForm/>
            
        </div>
    )
}

export default Home;