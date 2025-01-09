import toast from "react-hot-toast";
import { axiosWrapper } from "../../../../common/wrappers/axiosWrapper";
import { CustomError, ErrorType } from "../../../../common/error-handlings/error-handler";
import { COURSE_ENDPOINTS } from "./api-endpoints";
import { IAddCourse, IBaseResponse, ICourse, IUpdateCourse } from "../types/course.type";

type ICourseResponse = IBaseResponse<ICourse[]> | IBaseResponse;

/**
 * Fetches courses based on user details
 * 
 * @param {string} username - Username of the requester
 * @param {number} role_id - Role ID of the requester
 * 
 * @returns {Promise<ICourseResponse>} A promise resolving to course data or error response
 */
export const fetchCourses = async (username: string, role_id: number): Promise<ICourseResponse> => {
    const toastId = toast.loading('Fetching courses...');
    try {
        const response = await axiosWrapper.get<ICourseResponse>(
            COURSE_ENDPOINTS.COURSE_CRUD.replace(':username/:role_id', `${username}/${role_id}`)
        );

        response.data = response.data || []; response?.data.sort((a: any, b: any) => {
            return new Date(b.updated_at || b.created_at).getTime() - new Date(a.updated_at || a.created_at).getTime();
        });

        toast.dismiss(toastId);

        if (!response || response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }

        if (response?.data?.length === 0) {
            throw new CustomError(ErrorType.SERVER, "No courses found", response?.status);
        }

        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: ICourseResponse = {
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
 * Adds a new course to the system
 * 
 * @param {string} loggedInUser - Username of the logged-in user
 * @param {number} loggedInRole - Role of the logged-in user
 * @param {IAddCourse} courseDetails - Details of the course to be added
 * 
 * @returns {Promise<ICourseResponse>} A promise resolving to course addition result or error response
 */
export const addCourseAPI = async (
    loggedInUser: string,
    loggedInRole: number,
    courseDetails: IAddCourse
): Promise<ICourseResponse> => {
    const toastId = toast.loading('Adding course...');
    try {
        const response = await axiosWrapper.post<ICourseResponse>(
            COURSE_ENDPOINTS.COURSE_CRUD.replace(':username/:role_id', `${loggedInUser}/${loggedInRole}`),
            courseDetails
        );

        toast.dismiss(toastId);

        if (response?.status !== 201 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }

        toast.success('Course added successfully!');
        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: ICourseResponse = {
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
 * Updates an existing course in the system
 * 
 * @param {string} loggedInUser - Username of the logged-in user
 * @param {number} loggedInRole - Role of the logged-in user
 * @param {IUpdateCourse} courseDetails - Details of the course to be updated
 * 
 * @returns {Promise<ICourseResponse>} A promise resolving to course update result or error response
 */


export const updateCourseApi = async (
    loggedInUser: string,
    loggedInRole: number,
    courseDetails: IUpdateCourse
): Promise<ICourseResponse> => {
    const toastId = toast.loading('Updating course...');
    try {
        const response = await axiosWrapper.patch<ICourseResponse>(
            COURSE_ENDPOINTS.COURSE_CRUD.replace(':username/:role_id', `${loggedInUser}/${loggedInRole}`),
            courseDetails
        );

        toast.dismiss(toastId);

        if (response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }

        toast.success('Course updated successfully!');
        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: ICourseResponse = {
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
 * Deletes a course from the system
 * 
 * @param {string} loggedInUser - Username of the logged-in user
 * @param {number} loggedInRole - Role of the logged-in user
 * @param {Object} deleteDetails - Details of the course to be deleted
 * @param {string} deleteDetails.course_id - Unique identifier of the course to delete
 * @param {string} deleteDetails.auth_email - Email for authentication
 * @param {string} deleteDetails.auth_password - Password for authentication
 * 
 * @returns {Promise<ICourseResponse>} A promise resolving to course delete result or error response
 */
export const deleteCourseApi = async (
    loggedInUser: string,
    loggedInRole: number,
    deleteDetails: {
        course_id: string,
        auth_email: string,
        auth_password: string
    }
): Promise<ICourseResponse> => {
    const toastId = toast.loading('Deleting course...');
    try {
        const response = await axiosWrapper.delete<ICourseResponse>(
            COURSE_ENDPOINTS.COURSE_CRUD.replace(':username/:role_id', `${loggedInUser}/${loggedInRole}`),
            deleteDetails
        );

        toast.dismiss(toastId);

        if (response?.status !== 200 || !response?.success) {
            toast.error(response?.message || "Invalid response from server, Try again later");
            throw new CustomError(ErrorType.SERVER, response?.message || "Invalid response from server, Try again later", response?.status);
        }

        toast.success('Course deleted successfully!');
        return response;
    } catch (error: any) {
        toast.dismiss(toastId);
        const errorResponse: ICourseResponse = {
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