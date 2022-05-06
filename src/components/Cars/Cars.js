import {useEffect, useState} from "react";
import {carService} from "../../services";
import {Car} from "../Car/Car";

const Cars = () => {
    const [cars, setCars] = useState([]);

    // todo create slice
    useEffect(() => {
        carService.getAll().then(({data}) => setCars(data))
    }, [])
    return (
        <div>
            {cars.map(car => <Car key={car.id} car={car}/>)}
        </div>
    );
};

export {Cars};