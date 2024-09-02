import axios from 'axios';

// Create an instance of axios with default settings
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Adjust the base URL to your backend
  headers: {
    'Content-Type': 'application/json',
    // You can add more default headers if needed
  },
});

export default axiosInstance;
