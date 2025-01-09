import React, { useCallback } from "react";
import { ICourse } from "../../types/course.type";
import { Button } from "react-bootstrap";
import toast from "react-hot-toast";

const validateDescription = (description: string, minWords: number = 50): boolean => {
    return description.trim() === '' ||
        description.trim().split(/\s+/).length < minWords;
}

type ActionType = 'delete' | 'edit' | 'save' | 'cancel';


const FooterContent: React.FC<{
    selectedCourse: ICourse,
    updatedStates: any,
    actions: { edit: boolean },
    setUpdatedStates: React.Dispatch<React.SetStateAction<any>>,
    setActions: React.Dispatch<React.SetStateAction<{ edit: boolean }>>,
    setshowpasswordmodal: React.Dispatch<React.SetStateAction<{ update: boolean, delete: boolean }>>,
    setEmptyStates: React.Dispatch<React.SetStateAction<any>>,
    setModifiedStatesOnly: React.Dispatch<React.SetStateAction<any>>
}> = ({
    selectedCourse,
    updatedStates,
    setUpdatedStates,
    actions,
    setActions,
    setshowpasswordmodal,
    setEmptyStates,
    setModifiedStatesOnly
}): JSX.Element => {

        const validateEmptyStates = useCallback(() => ({
            course_name: updatedStates.course_name === '',
            course_duration: (updatedStates.course_duration === '' || updatedStates.course_duration === '0'),
            course_desc: updatedStates.course_desc === '',
            desc_below_length: (updatedStates.course_desc !== '' && validateDescription(updatedStates.course_desc)),
            tech_stack: updatedStates.tech_stack.length === 0
        }), [updatedStates]);

        /* eslint-disable react-hooks/exhaustive-deps */
        const validateModifiedStates = useCallback(() => {
            const emptyStates = validateEmptyStates();
            const hasEmptyStates = Object.values(emptyStates).some(Boolean);

            setEmptyStates(emptyStates);

            if (hasEmptyStates) return false;

            const modifiedPairs = Object.keys(updatedStates).reduce((acc, key) => {
                if (updatedStates[key] !== selectedCourse[key as keyof ICourse]) {
                    acc[key] = updatedStates[key];
                }
                return acc;
            }, {} as Record<string, any>);

            if (Object.keys(modifiedPairs).length === 0) {
                toast.error('None of the fields have been modified');
                return false;
            }

            setModifiedStatesOnly(modifiedPairs);
            return true;
        }, [validateEmptyStates]);


        /* eslint-disable react-hooks/exhaustive-deps */
        const handleActions = useCallback((action: ActionType) => {
            const actionHandlers: Record<ActionType, () => { edit: boolean }> = {
                delete: () => {
                    setshowpasswordmodal({ update: false, delete: true });
                    return actions;
                },
                edit: () => ({ ...actions, edit: true }),
                save: () => {
                    const updatesValidations = validateModifiedStates();
                    if (updatesValidations) {
                        setshowpasswordmodal({ update: true, delete: false });
                    }
                    return actions;
                },
                cancel: () => {
                    setUpdatedStates(selectedCourse);
                    setEmptyStates({
                        course_name: false,
                        course_duration: false,
                        course_desc: false,
                        tech_stack: false
                    });
                    return { ...actions, edit: false };
                }
            };

            const handler = actionHandlers[action] || (() => actions);
            setActions(handler);
        }, [
            actions,
            setActions,
            selectedCourse,
            setUpdatedStates,
            setEmptyStates,
            setshowpasswordmodal,
            validateEmptyStates
        ]);

        return (
            <div className="selC-footer" >
                {!actions.edit &&
                    <Button

                        className="footer-btns edit-btn"
                        onClick={() => handleActions("edit")}
                    >Edit</Button>
                }
                {actions.edit && <div className="d-flex gap-2 align-items-center" >
                    <Button
                        className="footer-btns save-btn"
                        onClick={() => handleActions("save")}
                    >Save</Button>
                    <Button
                        className="footer-btns cancel-btn"
                        onClick={() => handleActions("cancel")}
                    >Cancel</Button>
                </div>}
                <Button
                    disabled={actions.edit}
                    className="footer-btns delete-btn"
                    onClick={() => handleActions("delete")}
                >Delete</Button>
            </div>
        )
    }

export default React.memo(FooterContent);