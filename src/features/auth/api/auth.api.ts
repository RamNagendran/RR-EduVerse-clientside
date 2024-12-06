
import toast from 'react-hot-toast';
import { axiosWrapper } from '../../../common/wrappers/axiosWrapper';
import { IErrorResponse, ILoginCredentials, ILoginResponse } from '../types/auth.types';
import { AUTH_ENDPOINTS } from './api-endpoints';
import { CustomError } from '../../../common/error-handlings/error-handler';


/**
 * Authenticates a user with their email and password
 * 
 * @async
 * @param {ILoginCredentials} credentials - The user's login credentials
 * @param {string} credentials.email - User's email address
 * @param {string} credentials.password - User's password
 * 
 * @returns {Promise<ILoginResponse | IErrorResponse>} Returns either:
 * - ILoginResponse containing auth token on successful login
 * - IErrorResponse containing error message on failed login
 * 
 * @throws {CustomError} When server returns a specific error message
 * @throws {Error} When an unexpected error occurs
 * 
 * @example
 * try {
 *   const response = await loginApi({ 
 *     email: "user@example.com", 
 *     password: "password123" 
 *   });
 *   if ('token' in response) {
 *     // Login successful
 *   } else {
 *     // Handle error
 *   }
 * } catch (error) {
 *   // Handle unexpected errors
 * }
 */

export const loginApi = async (credentials: ILoginCredentials): Promise<ILoginResponse | IErrorResponse> => {
    const toastId = toast.loading('Logging in...');
    try {
        const response = await axiosWrapper.post<ILoginResponse>(AUTH_ENDPOINTS.LOGIN, credentials);
        toast.dismiss(toastId);

        // Check if response exists and has token
        if (!response?.token || !response?.success) {
            const errorResponse: IErrorResponse = {
                data: null,
                error: "Invalid response from server, Try again later"
            };
            toast.error(errorResponse.error);
            return errorResponse;
        }

        toast.success('Logged in successfully!');
        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: IErrorResponse = {
            data: null,
            error: error instanceof CustomError
                ? error.message
                : error instanceof Error
                    ? error.message
                    : "Something unexpected happened, please try again later"
        };

        toast.error(errorResponse.error);
        return errorResponse;
    }
};