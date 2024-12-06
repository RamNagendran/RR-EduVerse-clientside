import React from "react";
import NoDataImg from '../../assets/images/SVGs/noData.svg';


export const NoData: React.FC = () => {
    return (
        <div className="h-full w-full">
            <img src={NoDataImg} alt="no-data" height={500} width={700} />
        </div>
    )
}