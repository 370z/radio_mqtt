import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  // Add any custom properties you need for the request config
}

const instance: AxiosInstance = axios.create({
  baseURL: 'https://api.example.com', // Set your API base URL here
});

// Request interceptor
instance.interceptors.request.use(
  (config: CustomAxiosRequestConfig) => {
    // Modify the request config before sending it
    // For example, you can add headers or handle authentication
    return config;
  },
  (error) => {
    // Handle errors that occurred during the request
    return Promise.reject(error);
  }
);

// Response interceptor
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    // Modify the response data before resolving the promise
    // For example, you can handle common errors or extract data
    return response.data;
  },
  (error) => {
    // Handle errors that occurred during the response
    return Promise.reject(error);
  }
);

export default instance;
