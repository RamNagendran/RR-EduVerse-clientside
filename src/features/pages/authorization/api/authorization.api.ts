import toast from "react-hot-toast";
import { axiosWrapper } from "../../../../common/wrappers/axiosWrapper";
import { AUTHORIZATION_ENDPOINTS } from "./api-endpoints";
import { CustomError, ErrorType } from "../../../../common/error-handlings/error-handler";
import { IBaseResponse, IFetchRole, IRoles, IUpdatePermissions } from "../types/auth.type";



/**
 * Fetches roles for a user
 * @param {IFetchRole} props - Fetch parameters
 * @returns {Promise<IResponse>} Roles data or error response
 * @throws {Error} On server or fetch errors
 */

type IResponse = IBaseResponse<IRoles[]> | IBaseResponse;

export const fetchRoles = async (props: IFetchRole): Promise<IResponse> => {
    const { username, role_id } = props;
    const toastId = toast.loading('Fetching roles...');
    try {
        const response = await axiosWrapper.get<IResponse>(AUTHORIZATION_ENDPOINTS.FETCH.replace(':username/:role_id', `${username}/${role_id}`));

        toast.dismiss(toastId);

        if (!response || response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }

        if (response?.data?.length === 0) {
            throw new CustomError(ErrorType.SERVER, "No roles found", response?.status);
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
 * Updates role permissions
 * @param {string} loggedInUser - Current user's username
 * @param {number} loggedInRole - Current user's role ID
 * @param {IUpdatePermissions} permsDetails - Permission update details
 * @returns {Promise<IResponse>} Update role response
 */

export const updateRole = async (loggedInUser: string, loggedInRole: number, permsDetails: IUpdatePermissions): Promise<IBaseResponse> => {
    const toastId = toast.loading('Updating role...');
    try {
        const response = await axiosWrapper.put<IBaseResponse>(
            AUTHORIZATION_ENDPOINTS.UPDATE.replace(':username/:role_id', `${loggedInUser}/${loggedInRole}`),
            permsDetails
        );
        toast.dismiss(toastId);
        if (response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }
        toast.success('Role updated successfully!');
        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: IBaseResponse = {
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