import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import React, { Fragment } from "react";
import { ROLE } from "../../../../common/constants";
import '../../../../assets/sass/style.scss';

interface IRoleDropdown {
    selectedRole: any;
    setSelectedRole: React.Dispatch<React.SetStateAction<any>>;
}

function RoleDropdown(props: IRoleDropdown): JSX.Element {
    const { selectedRole, setSelectedRole } = props;

    return (
        <Listbox onChange={(e) => setSelectedRole(e)}>
            <div className="listBox-style position-relative">
                <Listbox.Button className="position-relative button">
                    {selectedRole && <span title={ROLE[selectedRole]} className="btn-text" >{ROLE[selectedRole]}</span>}
                    {!selectedRole && <span style={{ fontSize: "13px", fontWeight: 400, color: "lightgrey" }} className="btn-text" >Choose role</span>}
                    <ChevronUpDownIcon
                        style={{ height: "20px", width: "20px", color: "#000" }}
                        aria-hidden="true"
                    />
                </Listbox.Button>
                <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Listbox.Options
                        style={{
                            boxShadow: "rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em, rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em, rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset",
                            width: "120px", background: "#F7F9FD", border: "1px solid #eaeaea", borderRadius: "5px", zIndex: 5
                        }}
                        className="p-2 position-absolute mt-1"
                    >
                        <Listbox.Option
                            style={{ listStyleType: "none" }}
                            className={({ active }) => `p-1 px-2 ${active ? "active" : ""}`}
                            value={null}
                        >
                            {({ selected }) => {
                                return <>
                                    <span
                                        style={{ fontSize: "13px", fontWeight: selected ? 700 : 400 }}
                                    >ALL</span>
                                </>
                            }
                            }
                        </Listbox.Option>
                        {Object.keys(ROLE).map((role: any, index: number) => (
                            <Listbox.Option
                                key={index}
                                style={{ listStyleType: "none" }}
                                className={({ active }) => `p-1 px-2 ${active ? "active" : ""}`}
                                value={role}
                            >
                                {({ selected }) => {
                                    return <>
                                        <span
                                            style={{ fontSize: "13px", fontWeight: selected ? 700 : 400 }}
                                        >{ROLE[role]}</span>
                                    </>
                                }
                                }
                            </Listbox.Option>
                        ))}
                    </Listbox.Options>
                </Transition>
            </div>
        </Listbox>
    )
}

export default RoleDropdown;