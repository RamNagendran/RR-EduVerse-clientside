import React from "react";

export const GenericError: React.FC<{errorDetails:string}> = (props):JSX.Element => {
    const {errorDetails} = props; 
    return(
        <>
            {errorDetails ? (
                <div className="error-box">
                    {errorDetails}
                </div>
            ) : null}
        </>
    )
};

export const FieldError: React.FC<{ message: string }> = ({ message }):JSX.Element => (
    <label className='not-provided'>* {message}</label>
);