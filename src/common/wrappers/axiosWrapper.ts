import axios, { AxiosInstance, AxiosError, AxiosResponse } from 'axios';
import { base_url } from '../../config';
import { CustomError, ErrorType } from '../error-handlings/error-handler';

// Error types
export interface ApiError {
    message: string;
    code?: string;
    status?: number;
}

// API Client class
class AxiosWrapper {
    private static instance: AxiosWrapper;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: base_url,
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    public static getInstance(): AxiosWrapper {
        if (!AxiosWrapper.instance) {
            AxiosWrapper.instance = new AxiosWrapper();
        }
        return AxiosWrapper.instance;
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.axiosInstance.interceptors.request.use(
            (config) => {
                // Get token from storage
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(this.handleError(error));
            }
        );

        // Response interceptor
        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                return Promise.reject(this.handleError(error));
            }
        );
    }

    private handleError(error: AxiosError): ApiError {
        if (error.response) {
            // Server responded with error status
            const status = error.response.status;
            const data:any = error?.response?.data;
            switch (status) {
                case 400:
                    throw new CustomError(
                        ErrorType.VALIDATION,
                        data?.message || 'Invalid request data',
                        status,
                        data
                    );
                case 401:
                    localStorage.removeItem('authToken');
                    throw new CustomError(
                        ErrorType.AUTH,
                        'Your session has expired. Please log in again.',
                        status
                    );
                case 403:
                    throw new CustomError(
                        ErrorType.AUTH,
                        'You do not have permission to perform this action',
                        status
                    );
                case 404:
                    throw new CustomError(
                        ErrorType.NOT_FOUND,
                        'The requested resource was not found',
                        status
                    );
                case 500:
                    throw new CustomError(
                        ErrorType.SERVER,
                        data?.message || 'An unexpected server error occurred',
                        status,
                        data
                    );
                default:
                    throw new CustomError(
                        ErrorType.UNKNOWN,
                        data?.message || 'An unexpected error occurred',
                        status,
                        data
                    );
            }
        } else if (error.request) {
            // Request made but no response
            throw new CustomError(
                ErrorType.NETWORK,
                'Network error. Please check your connection.',
                0
            );
        }

        throw new CustomError(
            ErrorType.UNKNOWN,
            error.message || 'An unexpected error occurred'
        );
    }

    // Generic request methods
    public async get<T>(url: string, config = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    public async post<T>(url: string, data = {}, config = {}): Promise<T> {
        try {
            const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    // Add other methods (PUT, DELETE, etc.) as needed
}

export const axiosWrapper = AxiosWrapper.getInstance();