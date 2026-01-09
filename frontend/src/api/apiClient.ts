import axios from 'axios';
console.log("My API URL is:", import.meta.env.VITE_API_BASE_URL);

// 1. Create the instance with a timeout and env-based URL
const apiClient = axios.create({
    // Use environment variables so it works in production
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
    timeout: 10000, // Stops the request if it takes longer than 10 seconds
    headers: {
        'Content-Type': 'application/json',
    },
});

// 2. Request Interceptor: Automatically attach JWT token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// 3. Response Interceptor: Global error handling
apiClient.interceptors.response.use(
    (response) => response, // Directly return the response if successful
    (error) => {
        // Handle common HTTP errors (401, 403, 500, etc.)
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    console.error('Unauthorized - Logging out...');
                    // localStorage.removeItem('token'); 
                    // window.location.href = '/login'; UNCOMMENT ONCE JWT ENABLED ^^
                    break;
                case 403:
                    console.error('Forbidden - You do not have permission.');
                    break;
                case 500:
                    console.error('Server Error - Please try again later.');
                    break;
            }
        } else if (error.request) {
            console.error('Network Error - No response received from server.');
        }
        
        return Promise.reject(error);
    }
);

export default apiClient;