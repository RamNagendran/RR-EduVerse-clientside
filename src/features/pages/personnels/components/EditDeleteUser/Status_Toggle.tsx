import React, { Dispatch } from "react";
import "../scss/edit-delete-user.scss";

interface ToggleSwitchProps {
  status: boolean;
  setStatus: Dispatch<React.SetStateAction<boolean>>;
  setChanges: Dispatch<React.SetStateAction<Object>>
}

const Toggle_Switch: React.FC<ToggleSwitchProps> = ({
  status,
  setStatus,
  setChanges
}) => {

  const onChange = () => {
    setStatus((prevStatus) => !prevStatus);
    if(!status){
      setChanges((prev) => ({...prev,status: "active"}))
    }else{
      setChanges((prev) => ({...prev,status: "inactive"}))
    }
  };

  return (
    <label className="switch">
      <input
        type="checkbox"
        checked={status}
        onChange={onChange}
      />
      <span className="slider"></span>
    </label>
  );
};

export default Toggle_Switch;