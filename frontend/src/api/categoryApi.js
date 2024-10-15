import axios from 'axios';

const API_URL = '/categories';

export const getCategories = () => {
    return axios.get(API_URL);
};

export const getCategory = (id) => {
    return axios.get(`${API_URL}/${id}`);
};

export const createCategory = (category) => {
    return axios.post(API_URL, category);
};

export const updateCategory = (id, category) => {
    return axios.put(`${API_URL}/${id}`, category);
};

export const deleteCategory = (id) => {
    return axios.delete(`${API_URL}/${id}`);
};

export const getMovementsByCategoryId = async (categoryId) => {
    const response = await axios.get(`${API_URL}/${categoryId}`);
    return response.data;
};
