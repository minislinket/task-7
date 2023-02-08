import { CarsContext } from "../context/carsContext";
import { useContext } from "react";

export const useCarsContext = () => {
    const context = useContext(CarsContext)

    if (!context) {
        throw Error('carContext must be used inside a CarsContextProvider')
    }
    
    return context
};