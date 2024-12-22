import toast from "react-hot-toast";
import { axiosWrapper } from "../../../../common/wrappers/axiosWrapper";
import { USER_ENDPOINTS } from "./api-endpoints";
import { CustomError } from "../../../../common/error-handlings/error-handler";
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

        if (response.status !== 200 || !response.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new Error(response?.message || "Invalid response from server, Try again later");
        }

        if (response?.data?.length === 0) {
            toast.error("No users found");
            throw new Error("No users found");
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

// here next update and delete user api functions should come....