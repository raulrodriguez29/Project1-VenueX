import api from './axios.config';

export const getUserById = async (id: number) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
};