import { axiosWrapper } from "../../../../common/wrappers/axiosWrapper"
import { IUserDetails } from "../components/types/adduser.types"
import { AUTH_ENDPOINTS } from "./api-endpoints"

interface AddUserAPIProps {
    userDetails:IUserDetails
    setError:React.Dispatch<React.SetStateAction<boolean>>
    setErrorDetails:React.Dispatch<React.SetStateAction<string>>
    setOpenModal:React.Dispatch<React.SetStateAction<boolean>>
}

export const addUserAPI = async({userDetails,setError,setErrorDetails,setOpenModal}:AddUserAPIProps) => {
    userDetails.phone = Number(userDetails.phone);
    let response:any = "";
    setError(false)
    setErrorDetails("")
    try {
        response = await axiosWrapper.post(AUTH_ENDPOINTS.ADD_USER, userDetails);
        if (response.statusCode !== 200) {
            setError(true); 
        }
        setError(false)
        setOpenModal(false)
    } catch (error:any) {
        setError(true);
        setErrorDetails(error.details.message)
    }
}