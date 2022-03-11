import{SERVER}from"../settings.js"
import {makeOptions} from "../fetchUtils.js";

const URL = SERVER+"/cars"

export function addCarHandles() {
    document.getElementById("btn-add-car").onclick = addCar
}

function addCar(){
    const car ={}
    car.brand = document.getElementById("input-brand").value
    car.model = document.getElementById("input-model").value
    car.pricePrDay = document.getElementById("input-price").value
    car.bestDiscount = document.getElementById("input-discount").value


    fetch(URL,makeOptions("POST",car,true))
        .then(res=>{
            if(!res.ok){
                return Promise.reject("Error: " + res.status)
            }
            return res.json()
        })
        .then(newCar=>{
            document.getElementById("car-info-all").innerText = JSON.stringify(newCar)
        })
        .catch(e => console.error(e))
}