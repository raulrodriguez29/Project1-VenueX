import api from './axios.config';

export interface AuthResponse {
    id: number,
    token: string; 
    role: string;
    email: string;
    firstName: string;
    lastName: string;  
    phone: string;
}

export interface RegisterData {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
}

//const API_URL = 'http://localhost:8080/api/auth'; 

export const registerUser = async (userData: RegisterData): Promise<AuthResponse> => {
    try {
        const response = await api.post(`/auth/register`, userData);
        
        const data = response.data;
        
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.id.toString()); // LocalStorage only stores strings
            localStorage.setItem('role', data.role);
            localStorage.setItem('email', data.email);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('lastName', data.lastName);
            localStorage.setItem('phone', data.phone || '');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};



export interface LoginData {
    email: string;
    password: string;
}



export const loginUser = async (credentials: LoginData): Promise<AuthResponse> => {
    try {
        const response = await api.post(`/auth/login`, credentials);
        
        const data = response.data;
        // ADD THIS LINE
        //console.log("SERVER RESPONSE DATA:", data);
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('id', data.id.toString()); // LocalStorage only stores strings
            localStorage.setItem('role', data.role);
            localStorage.setItem('email', data.email);
            localStorage.setItem('firstName', data.firstName);
            localStorage.setItem('lastName', data.lastName);
            localStorage.setItem('phone', data.phone || '');
        }
        
        return data;
    } catch (error) {
        throw error;
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('role');
    localStorage.removeItem('email');
    localStorage.removeItem('firstName');
    localStorage.removeItem('lastName');
    localStorage.removeItem('phone');
};
