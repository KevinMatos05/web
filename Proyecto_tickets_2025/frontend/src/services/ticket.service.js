import axios from "axios";
import { API_URL } from "../constants/constants";

const getAll = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

const createTicket = async (data) => {
    try {
        const response = await axios.post(API_URL, data)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}


const ticket_services = {
    getAll,
    createTicket
}

export {ticket_services}