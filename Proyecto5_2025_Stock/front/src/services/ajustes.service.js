import axios from "axios"
import { API_URL } from "../constants/constants"

const getReservas = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}


const createReserva = async (data) => {
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

const ajustes_services = {
    getReservas,
    createReserva
}

export {ajustes_services}