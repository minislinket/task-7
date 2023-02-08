import { createContext, useReducer } from "react";

export const CarsContext = createContext();
//https://www.youtube.com/watch?v=NKsVV7wJcDM&list=PL4cUxeGkcC9iJ_KkrkBZWZRHVwnzLIoUE&index=11

export const carsReducer = (state, action) => {

    switch (action.type){
    case 'SET_CARS' :
    return {
        cars: action.payload
    }
    
    case 'CREATE_CAR':
    return{
        cars : [action.payload, ...state.cars]
    }
    case 'DELETE_CAR':
    return {
        cars: state.cars.filter( (car) => car._id !== action.payload._id )
    }
    case 'PATCH_CAR':

    var car = state.cars.filter(stateCar => stateCar._id === action.payload._id)[0];

    if(car)
    {
        console.log(car, action);
        car = action.payload;
    }

    return{
        cars: state.cars
    }
    default:
        return state
    }
}
export const CarsContextProvider = ({children}) => { //here children refers to App in index file because it is wrapped in cardContextprovider (children represents whatever carscontextprovider wraps)
    const [state, dispatch] = useReducer(carsReducer, {
        cars : null
    })

    
    return (
        <CarsContext.Provider value={{...state, dispatch}}>
            { children }
        </CarsContext.Provider>
    )
}