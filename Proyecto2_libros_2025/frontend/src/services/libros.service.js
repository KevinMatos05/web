import axios from "axios"
import { API_URL } from "../constants/constants"

const getAllLibros = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data 
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

const getLibrosByTitulo = async (titulo) => {
    try {
        const response = await axios.get(`${API_URL}?search=${titulo}`)
        return response.data
    } catch (error) {
        if(error.response) {
            return error.response.data
        }
    }
}

const createLibro = async (libro) => {
    try {
        const response = await axios.post(API_URL, libro)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

const deleteLibro = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

const getLibroById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

const updateLibro = async (id, data) => {
    try {
        const response = await axios.put(`${API_URL}/${id}`, data)
        return response.data
    } catch (error) {
        if (error.response) {
            return error.response.data
        }
    }
}

const libros_service = {
    getAllLibros,
    getLibrosByTitulo,
    createLibro,
    deleteLibro,
    updateLibro,
    getLibroById
}

export {libros_service}