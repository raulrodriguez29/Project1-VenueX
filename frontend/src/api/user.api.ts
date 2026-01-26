import api from './axios.config';

export const getUserById = async (id: number) => {
    const response = await api.get(`/user/${id}`);
    return response.data;
};

export const changePassword = async (id: number, passwordData: any) => {
    // We send currentPassword and newPassword to the backend
    const response = await api.put(`/user/${id}/password`, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
    });
    return response.data;
};

export const deleteUser = async (id: number) => {
    // Axios will send the JWT in the header automatically
    const response = await api.delete(`/user/${id}`);
    return response.data;
};