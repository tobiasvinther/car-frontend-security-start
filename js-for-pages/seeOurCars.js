import {encode} from "../utils.js"
import {SERVER} from "../settings.js"

const URL = SERVER+"/cars"
let myCars = []

export function getAllCars(){
    if(myCars.length > 0){
        makeRows(myCars)
        return
    }
    fetch(URL)
        .then(res => res.json())
        .then(cars => {
            makeRows(cars)
            myCars = cars
        })
        .catch(e => console.error(e))
}

function makeRows(rows){
    document.getElementById("car-rows").innerHTML = rows.map(car =>
    `
    <tr>
        <td>${encode(car.id)}</td>
        <td>${encode(car.brand)}</td>
        <td>${encode(car.model)}</td>
        <td>${encode(car.pricePrDay)}</td>
    </tr>
    `
    ).join("\n")
}