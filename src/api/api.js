import axios from 'axios';

const baseURL = 'http://localhost:8080/';

const axiosInstance = axios.create({
    baseURL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getAuthToken = async (username, password) => {
    try {
        const response = await axios.post(`${baseURL}login`, { username, password });
        const token = response.data;
        localStorage.setItem('token', token);
        return true;
    } catch (error) {
        console.error('Erro ao obter token: ', error);
        throw error;
    }
};

export const getRequest = async (endpoint) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get(`${baseURL}${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro na solicitação GET:', error);
        throw error;
    }
};

export const postRequest = async (endpoint, data = {}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.post(`${baseURL}${endpoint}`,data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro na solicitação POST:', error);
        throw error;
    }
};

export const putRequest = async (endpoint, data = {}) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.put(`${baseURL}${endpoint}`, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Erro na solicitação PUT:', error);
        throw error;
    }
};

export const deleteRequest = async (endpoint, id) => {
    console.log(id + "~" + endpoint)
    try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.delete(`${baseURL}${endpoint}/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        window.location.reload()
        return response.data;
    } catch (error) {
        console.error('Erro na solicitação DELETE:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};

export const getIsAuthenticated = async () => {
    try {
        const token = localStorage.getItem('token')
        const response = await axios.post(`${baseURL}login/verificarToken`, { token });
        return response.data
    } catch (error) {
        console.error('O token nao e valido negao ou o metodo n presta', error)
        throw error;
    }
}