import React from "react";
import { IAddCourseActions } from "../types/course.type";
import { Button, Modal } from "react-bootstrap";
import { confirmModalStyles } from "../../../../common/utils/confirm-modal-styles";
import { TagsInput } from "react-tag-input-component";

const COURSE_NAME_PLACEHOLDER = "Enter course name";
const COURSE_DURATION_PLACEHOLDER = "Enter course duration";
const DESCRIPTION_PLACEHOLDER = "Describe the content of the course, it should be minimum 50 words";

const AddCourse: React.FC<IAddCourseActions> = ({
    openAddCourseModal,
    setOpenAddCourseModal,
    addCourseDetails,
    setAddCourseDetails,
    handleAddCourse
}): JSX.Element => {
    return (
        <Modal dialogClassName="modal-90w" show={openAddCourseModal} style={{ borderRadius: "0px" }} >
            <Modal.Header style={{ backgroundColor: "#002855", color: "#fff" }}>
                <Modal.Title style={{ fontSize: "14px", fontWeight: 700 }} >ADD COURSE</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ height: "430px" }} className="d-flex flex-column justify-content-between">
                <div className="addCourse-modal-content" >
                    <div className="mb-4" >
                        <input
                            className="MC-field-input"
                            placeholder={COURSE_NAME_PLACEHOLDER}
                            value={addCourseDetails.course_name}
                            onChange={(e) => setAddCourseDetails({ ...addCourseDetails, course_name: e.target.value })}
                        />
                    </div>
                    <div className="mb-4" >
                        <input
                            className="MC-field-input"
                            placeholder={COURSE_DURATION_PLACEHOLDER}
                            value={addCourseDetails.course_duration || ""}
                            onChange={(e) => setAddCourseDetails({ ...addCourseDetails, course_duration: parseInt(e.target.value) })}
                        />
                    </div>
                    <div className="mb-4" >
                        <textarea
                            style={{ height: "150px" }}
                            className="MC-field-input"
                            placeholder={DESCRIPTION_PLACEHOLDER}
                            value={addCourseDetails.course_desc}
                            onChange={(e) => setAddCourseDetails({ ...addCourseDetails, course_desc: e.target.value })}
                        />
                    </div>
                    <div className="mb-4" >
                        <TagsInput
                            classNames={{ tag: 'MC-field-tags', input: "MC-field-input" }}
                            value={addCourseDetails.tech_stack}
                            onChange={(e) => setAddCourseDetails({ ...addCourseDetails, tech_stack: e })}
                            placeHolder="Enter technologies"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer style={{ borderTop: "none" }} >
                <Button style={confirmModalStyles.cancel} onClick={() => setOpenAddCourseModal(false)}>
                    Cancel
                </Button>
                <Button style={confirmModalStyles.addCourse} onClick={handleAddCourse}>
                    Add Course
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddCourse;