import React,{Dispatch} from "react";

interface AddUserErrorProps {
    errorDetails:string
    setErrorDetails:Dispatch<React.SetStateAction<string>>
}

const AddUserError: React.FC<AddUserErrorProps> = ({errorDetails,setErrorDetails}) => {
    return(
        <>
            {errorDetails ? (
                <div className="error-box">
                    {errorDetails}
                </div>
            ) : null}
        </>
    )
}

export default AddUserError