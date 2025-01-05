import toast from "react-hot-toast";
import { axiosWrapper } from "../../../../common/wrappers/axiosWrapper";
import { USER_ENDPOINTS } from "./api-endpoints";
import { CustomError, ErrorType } from "../../../../common/error-handlings/error-handler";
import { IBaseResponse, IFetchUsers, Iuser } from "../types/personnel.type";



/**
 * Fetches users based on username and role ID
 * 
 * @param {IFetchUsers} props - Parameters for fetching users
 * @param {string} props.username - Username of the requester
 * @param {number} props.role_id - Role ID of the requester
 * 
 * @returns {Promise<IResponse>} A promise resolving to user data or error response
 * 
 * @throws {Error} Throws an error if:
 * - Server response is invalid
 * - No users are found
 * - Unexpected error occurs
 * 
 * @example
 * try {
 *   const users = await fetchUsers({ 
 *     username: 'admin', 
 *     role_id: 1 
 *   });
 *   if (users.success) {
 *     // Process users
 *   }
 * } catch (error) {
 *   // Handle error
 * }
 * 
 * @description
 * - Loads users with a toast notification
 * - Handles various error scenarios
 * - Returns standardized response
 */


type IResponse = IBaseResponse<Iuser[]> | IBaseResponse;

export const fetchUsers = async (props: IFetchUsers): Promise<IResponse> => {
    const { username, role_id } = props;
    const toastId = toast.loading('Fetching users...');
    try {
        const response = await axiosWrapper.get<IResponse>(USER_ENDPOINTS.FETCH.replace(':username/:role_id', `${username}/${role_id}`));

        toast.dismiss(toastId);

        if (!response || response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }

        if (response?.data?.length === 0) {
            throw new CustomError(ErrorType.SERVER, "No users found", response?.status);
        }

        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: IResponse = {
            status: 500,
            success: false,
            message: error instanceof CustomError
                ? error.message
                : error instanceof Error
                    ? error.message
                    : "Something unexpected happened, please try again later"
        };

        toast.error(errorResponse.message);
        return errorResponse;
    }
};

/**
 * Adds a new user to the system
 * 
 * @param {Iuser} userDetails - Details of the user to be added
 * @param {string} userDetails.username - Username of the new user
 * @param {string} userDetails.role_id - Role ID of the new user
 * 
 * @returns {Promise<IResponse>} A promise resolving to user addition result or error response
 * 
 * @throws {CustomError} Throws a custom error if:
 * - Server response is invalid
 * - User creation fails
 * - Unexpected error occurs during user addition
 * 
 * @example
 * try {
 *   const result = await addUserAPI({ 
 *     username: 'newuser', 
 *     role_id: 'admin',
 *     // other user details 
 *   });
 *   if (result.success) {
 *     // User added successfully
 *   }
 * } catch (error) {
 *   // Handle user addition error
 * }
 * 
 * @description
 * - Sends a POST request to add a new user
 * - Uses toast notifications for user feedback
 * - Handles various error scenarios
 * - Returns a standardized API response
 * 
 * @see CustomError For error handling details
 * @see IResponse For response structure
 */

export const addUserAPI = async (loggedInUser: string, loggedInRole: number, userDetails: Iuser): Promise<IResponse> => {
    const toastId = toast.loading('Adding user...');
    try {
        const response = await axiosWrapper.post<IResponse>(
            USER_ENDPOINTS.ADD_USER.replace(':username/:role_id', `${loggedInUser}/${loggedInRole}`),
            userDetails
        );
        toast.dismiss(toastId);
        if (response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }
        toast.success('User added successfully!');
        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: IResponse = {
            status: 500,
            success: false,
            message: error instanceof CustomError
                ? error.message
                : error instanceof Error
                    ? error.message
                    : "Something unexpected happened, please try again later"
        };

        toast.error(errorResponse.message);
        return errorResponse;
    }
}

export const updateUserAPI = async (loggedInUser: string, loggedInRole: number, changes: Object): Promise<IResponse> => {
    const toastId = toast.loading('Updating user...');
    try{
        const response = await axiosWrapper.patch<IResponse>(
            USER_ENDPOINTS.PATCH_USER.replace(':username/:role_id', `${loggedInUser}/${loggedInRole}`),
            changes
        )
        toast.dismiss(toastId);
        if (response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }
        toast.success('User updated successfully!');
        return response;
    }catch(error){
        toast.dismiss(toastId);
        const errorResponse: IResponse = {
            status: 500,
            success: false,
            message: error instanceof CustomError
                ? error.message
                : error instanceof Error
                    ? error.message
                    : "Something unexpected happened, please try again later"
        };

        toast.error(errorResponse.message);
        return errorResponse;
    }
}

export const deleteUserAPI = async (loggedInUser: string, loggedInRole: number, deleteDetails: Object): Promise<IResponse> => {
    const toastId = toast.loading('Deleting user...');
    try{
        const response = await axiosWrapper.delete<IResponse>(
            USER_ENDPOINTS.DELETE_USER.replace(':username/:role_id', `${loggedInUser}/${loggedInRole}`),
            deleteDetails
        )
        toast.dismiss(toastId);
        if (response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }
        toast.success('User deleted successfully!');
        return response;
    }catch(error){
        toast.dismiss(toastId);
        const errorResponse: IResponse = {
            status: 500,
            success: false,
            message: error instanceof CustomError
                ? error.message
                : error instanceof Error
                    ? error.message
                    : "Something unexpected happened, please try again later"
        };

        toast.error(errorResponse.message);
        return errorResponse;
    }
}