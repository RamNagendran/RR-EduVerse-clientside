import moment from "moment";
import { ICourse } from "../../types/course.type";
import { TagsInput } from "react-tag-input-component";
import DurationIcon from '../../../../../assets/images/SVGs/duration-icon';
import { useMemo } from "react";

const EmptyErrorElement: React.FC<{ message: string }> = ({ message }): JSX.Element => {
    return (
        <span style={{ color: 'red', fontSize: '12px' }} >{message}</span>
    )
}

const formatDate = (
    date: string | undefined,
    format: string = 'DD MMM YYYY'
): string => {
    // Try multiple parsing formats
    const parsedDate = moment(date, [
        'YYYY-MM-DD HH:mm:ss',
        'DD-MM-YYYY HH:mm:ss',
        'MM-DD-YYYY HH:mm:ss',
        'YYYY-MM-DD',
        'DD-MM-YYYY',
        'MM-DD-YYYY'
    ]);

    return parsedDate.isValid() ? parsedDate.format(format) : 'N/A';
};

const CourseDetailRow: React.FC<{
    id?: string;
    label: string;
    value: string | number;
    type?: string;
    icon?: React.ReactNode;
    editable?: boolean;
    editAction?: boolean;
    emptyStates?: any;
    setUpdatedStates?: React.Dispatch<React.SetStateAction<any>>;
    setEmptyStates?: React.Dispatch<React.SetStateAction<any>>;
    updatedStates?: any;
}> =
    ({
        id, label, value, type, icon, editable, editAction,
        emptyStates, setUpdatedStates, setEmptyStates, updatedStates = {}
    }) => {

        const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            if (editAction && editable && id && setUpdatedStates && setEmptyStates) {
                const newValue = e.target.value;
                setUpdatedStates((prev: any) => ({ ...prev, [id]: newValue }));
                setEmptyStates((prev: any) => ({ ...prev, [id]: false }));
            }
        }

        return (
            <div className="d-flex flex-column align-items-start w-50">
                <label className="fields-label">
                    {label}
                    {(editAction && editable) && <EmptyErrorElement message="*" />}
                </label>
                <span
                    className={`span-transition fields-value align-items-center gap-1 
                    ${editAction && editable ? 'd-none' : ''}
                `}
                >
                    {icon}{value}
                </span>
                <input
                    style={{ border: (editAction && editable && (id && emptyStates[id])) ? '1px solid red' : '' }}
                    onChange={handleOnChange}
                    className={`MC-field-input input-transition ${editAction && editable ? 'visible' : ''}`}
                    type={type}
                    value={id && updatedStates[id]}
                />
                {(editAction && editable && (id && emptyStates[id])) && <EmptyErrorElement message={'* Field should not be empty'} />}
            </div>
        )
    }

const CContentRenderer: React.FC<{
    selectedCourse: ICourse,
    editAction: boolean,
    updatedStates: any,
    emptyStates: any,
    setUpdatedStates: React.Dispatch<React.SetStateAction<any>>,
    setEmptyStates: React.Dispatch<React.SetStateAction<any>>
}> = ({
    selectedCourse,
    editAction,
    updatedStates,
    setUpdatedStates,
    emptyStates,
    setEmptyStates
}) => {
        const courseDetails = useMemo(() => [
            {
                id: 'course_id',
                label: 'COURSE ID',
                value: selectedCourse?.course_id,
            },
            {
                id: 'course_name',
                label: 'COURSE NAME',
                value: selectedCourse?.course_name,
                editable: true,
                type: 'text'
            },
            {
                id: 'course_duration',
                label: 'DURATION',
                value: `${selectedCourse?.course_duration} Months`,
                icon: <DurationIcon />,
                editable: true,
                type: 'number'
            },
            {
                label: 'BATCHES TAKEN THIS COURSE COUNT',
                value: '000'
            }
        ], [selectedCourse]);

        const userDetails = useMemo(() => [
            {
                label: 'CREATED BY',
                value: (
                    <div className="d-flex gap-2">
                        {selectedCourse?.created_by}
                        <span>at</span>
                        <span>{formatDate(selectedCourse?.created_at)}</span>
                    </div>
                )
            },
            {
                label: 'UPDATED BY',
                value: (
                    (selectedCourse?.updated_by && selectedCourse?.updated_at) ? (
                        <div className="d-flex gap-2">
                            {selectedCourse?.updated_by}
                            <span>at</span>
                            <span>{formatDate(selectedCourse?.updated_at)}</span>
                        </div>
                    ) : (
                        <span>NA</span>
                    )
                )
            }
        ], [selectedCourse]);

        return (
            <div className="c-content">
                <div className="d-flex justify-content-between w-100 my-4">
                    {courseDetails.slice(0, 2).map((detail: any, index: number) => (
                        <CourseDetailRow
                            type={detail.type}
                            editAction={editAction}
                            emptyStates={emptyStates}
                            setEmptyStates={setEmptyStates}
                            updatedStates={updatedStates}
                            setUpdatedStates={setUpdatedStates}
                            editable={detail.editable}
                            value={detail.value}
                            label={detail.label}
                            id={detail.id}
                            key={index}
                        />
                    ))}
                </div>

                <div className="d-flex justify-content-between w-100 my-4">
                    {courseDetails.slice(2).map((detail: any, index: number) => (
                        <CourseDetailRow
                            type={detail.type}
                            icon={detail.icon}
                            editAction={editAction}
                            emptyStates={emptyStates}
                            editable={detail.editable}
                            setEmptyStates={setEmptyStates}
                            setUpdatedStates={setUpdatedStates}
                            updatedStates={updatedStates}
                            label={detail.label}
                            value={detail.value}
                            id={detail.id}
                            key={index}
                        />
                    ))}
                </div>

                <div className="d-flex justify-content-between w-100 my-4">
                    {userDetails.map((detail: any, index: number) => (
                        <CourseDetailRow
                            key={index}
                            label={detail.label}
                            value={detail.value}
                        />
                    ))}
                </div>

                <div className="d-flex flex-column align-items-start w-100 my-4">
                    <label className="fields-label">
                        DESCRIPTION
                        {editAction && <EmptyErrorElement message="*" />}
                    </label>
                    <span
                        className={`span-transition fields-value ${editAction ? 'd-none' : ''}`}
                    >
                        {selectedCourse?.course_desc}
                    </span>
                    <textarea
                        style={{
                            border: (editAction && (emptyStates.course_desc || emptyStates.desc_below_length)) ? '1px solid red' : '',
                            height: editAction ? '80px' : "0px"
                        }}
                        className={`MC-field-input input-transition ${editAction ? 'visible' : ''}`}
                        value={updatedStates.course_desc}
                        onChange={(e) => {
                            setUpdatedStates({ ...updatedStates, course_desc: e.target.value });
                            setEmptyStates({ ...emptyStates, course_desc: false, desc_below_length: false });
                        }}
                    />
                    {(editAction && (emptyStates.course_desc)) && <EmptyErrorElement message={'* Field should not be empty'} />}
                    {(editAction && (emptyStates.desc_below_length)) && <EmptyErrorElement message={'* Description should have atleast minimum 50 words'} />}
                </div>
                <div className="d-flex flex-column align-items-start w-100">
                    <label className="fields-label">
                        TECHNOLOGIES USED
                        {editAction && <EmptyErrorElement message="*" />}
                    </label>
                    <div className={`tech-stack-container span-transition ${editAction ? 'd-none' : ''}`}>
                        <div className="tech-stack-badges">
                            {selectedCourse?.tech_stack?.map((tech: string, techIndex: number) => (
                                <span key={techIndex} className="tech-badge">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div
                        style={{
                            border: (editAction && (emptyStates.tech_stack)) ? '1px solid red' : '',
                        }}
                        className={`input-transition ${editAction ? 'visible' : ''}`} >
                        <TagsInput
                            classNames={{ tag: 'MC-field-tags', input: "MC-field-input" }}
                            value={updatedStates.tech_stack}
                            onChange={(e) => {
                                setUpdatedStates({ ...updatedStates, tech_stack: e });
                                setEmptyStates({ ...emptyStates, tech_stack: false });
                            }}
                            placeHolder="Enter technologies"
                        />
                        {(editAction && emptyStates.tech_stack) && <EmptyErrorElement message="* Field should not be empty" />}
                    </div>
                </div>
            </div>
        );
    };

export default CContentRenderer;