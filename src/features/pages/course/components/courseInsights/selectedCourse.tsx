import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import '../scss/selected-course.scss';
import BackIcon from '../../../../../assets/images/SVGs/back-icon.svg';
import { Button } from "react-bootstrap";
import { RootState } from "../../../../../stateManager/types";
import moment from "moment";
import { IBaseResponse, ICourse, IUpdateCourse } from "../../types/course.type";
import PasswordConfirmModal from "../../../../../common/password-confirmation";
import { deleteCourseApi, updateCourseApi } from "../../api/course-api";
import FooterContent from "./footer-content";
import CContentRenderer from "./CContent-renderer";
import { setSelectedCourse } from "../../../../../stateManager/reducer/courses.slice";
import { useNavigate } from "react-router-dom";

type ICourseResponse = IBaseResponse<ICourse[]> | IBaseResponse;

const BackButton: React.FC = () => {
    return (
        <div
            onClick={() => window.history.back()}
            style={{ cursor: "pointer" }}
            className="d-flex align-items-center justify-content-center cursor-pointer"
        >
            <img src={BackIcon} alt="BackIcon" height={20} width={20} />
            <span style={{ color: "#0466c8", fontSize: "16px", fontWeight: 700 }} >Back</span>
        </div>
    )
}


const UPDATES_INTIALS = {
    course_id: '',
    course_name: '',
    course_duration: 0,
    course_desc: '',
    tech_stack: [],
}

const EMPTY_STATES_INITIALS = {
    course_name: false,
    course_duration: false,
    course_desc: false,
    desc_below_length: false,
    tech_stack: false
}

const ACTIONS_INITIALS = {
    edit: false
}

const SelectedCourse: React.FC = (): JSX.Element => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state: RootState) => state.auth);
    const { selectedCourse } = useSelector((state: RootState) => state.courses);
    const [updatedStates, setUpdatedStates] = useState<any>(UPDATES_INTIALS);
    const [modifiedStatesOnly, setModifiedStatesOnly] = useState<any>({});
    const [showPasswordModal, setShowPasswordModal] = useState<{ update: boolean, delete: boolean }>({
        update: false,
        delete: false
    });
    const [authenticatedPassword, setAuthenticatedPassword] = useState<string>('');
    const [emptyStates, setEmptyStates] = useState(EMPTY_STATES_INITIALS);
    const [actions, setActions] = useState(ACTIONS_INITIALS);

    const HeaderSection = useCallback(() => (
        <div className="d-flex align-items-center justify-content-between w-100 h-7">
            <BackButton />
            <Button className="journey">JOURNEY</Button>
        </div>
    ), []);

    useEffect(() => {
        setUpdatedStates({ ...selectedCourse });
    }, [selectedCourse]);

    const handleUpdateCourse = async () => {

        const courseDetails: IUpdateCourse = {
            auth_email: user?.email,
            auth_password: authenticatedPassword,
            course_id: selectedCourse?.course_id,
            updated_by: `${user?.firstname} ${user?.lastname}`,
            updated_at: moment().format('DD/MM/YYYY HH:mm:ss'),
            ...modifiedStatesOnly
        }
        const res: ICourseResponse = await updateCourseApi(
            user?.username,
            user?.role_id,
            courseDetails
        );

        setShowPasswordModal({ ...showPasswordModal, update: false });
        setActions(ACTIONS_INITIALS);
        if (!res.success) {
            setUpdatedStates(selectedCourse);
            return;
        }
        dispatch(setSelectedCourse(res.data));
    }

    const handleDelete = async () => {
        const deleteDetails = {
            auth_email: user?.email,
            auth_password: authenticatedPassword,
            course_id: selectedCourse.course_id
        }
        const res = await deleteCourseApi(user?.username, user?.role_id, deleteDetails)
        setShowPasswordModal({ ...showPasswordModal, delete: false });
        if (!res.success) {
            return;
        }
        navigate('/courses');
        dispatch(setSelectedCourse(null));
    }


    return (
        <div className='selectedCourse'>
            <HeaderSection />
            {selectedCourse ? (
                <>
                    <CContentRenderer
                        emptyStates={emptyStates}
                        editAction={actions.edit}
                        updatedStates={updatedStates}
                        selectedCourse={selectedCourse}
                        setUpdatedStates={setUpdatedStates}
                        setEmptyStates={setEmptyStates}
                    />
                    <FooterContent
                        actions={actions}
                        updatedStates={updatedStates}
                        selectedCourse={selectedCourse}
                        setshowpasswordmodal={setShowPasswordModal}
                        setUpdatedStates={setUpdatedStates}
                        setModifiedStatesOnly={setModifiedStatesOnly}
                        setEmptyStates={setEmptyStates}
                        setActions={setActions}
                    />
                </>
            ) : (
                <div style={{ fontSize: "18px", fontWeight: 600, color: "#808080" }} className="d-flex justify-content-center align-items-center h-100">
                    No Course Selected
                </div>
            )}
            <PasswordConfirmModal
                authenticatedPassword={authenticatedPassword}
                show={showPasswordModal.update || showPasswordModal.delete}
                name={selectedCourse?.course_name}
                setAuthenticatedPassword={setAuthenticatedPassword}
                setShow={setShowPasswordModal}
                onConfirm={showPasswordModal.update ? handleUpdateCourse : handleDelete}
            />
        </div>
    );
};

export default SelectedCourse;