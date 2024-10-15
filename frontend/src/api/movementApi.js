import axios from 'axios';

const API_URL = '/movements';

export const getMovements = () => {
    return axios.get(API_URL);
};

export const getMovement = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createMovement = (movement) => {
    return axios.post(API_URL, movement);
};

export const updateMovement = (id, movement) => {
    return axios.put(`${API_URL}/${id}`, movement);
};

export const deleteMovement = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const getMovementTypes = () => {
    return axios.get(`${API_URL}/movement-types`);
};