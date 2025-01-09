import React from 'react';
import './scss/card-view.scss';
import moment from 'moment';
import DurationIcon from '../../../../assets/images/SVGs/duration-icon';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setSelectedCourse } from '../../../../stateManager/reducer/courses.slice';
import { ICourse } from '../types/course.type';

const DurationDisplay: React.FC<{ duration: number }> = ({
    duration
}): JSX.Element => {
    return (
        <div className='d-flex align-items-center my-2'>
            <div
                className='d-flex align-items-center justify-content-center rounded'
                style={{
                    height: "20px",
                    width: "20px",
                    backgroundColor: "rgb(234 244 255)"
                }}
            >
                <DurationIcon />
            </div>
            <div style={{ fontSize: "12px" }} className='d-flex align-items-center ms-1'>
                <span className='fw-semibold text-dark'>
                    {duration}
                    <span className='ms-1'>Months</span>
                </span>
            </div>
        </div>
    );
};


const TechStackDisplay: React.FC<{ techStack: string[] }> = ({
    techStack
}): JSX.Element => {
    return (
        <div className='tech-stack-container' >
            <div className='tech-stack-title' >Technologies to be covered:</div>
            <div className="tech-stack-badges">
                {techStack.map((tech: string, techIndex: number) => (
                    <span key={techIndex} className="tech-badge">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
}

const formatDate = (date: string | undefined): string => {
    // Try multiple parsing formats
    const parsedDate = moment(date, [
        'YYYY-MM-DD HH:mm:ss',
        'DD-MM-YYYY HH:mm:ss',
        'MM-DD-YYYY HH:mm:ss',
        'YYYY-MM-DD',
        'DD-MM-YYYY',
        'MM-DD-YYYY'
    ]);

    return parsedDate.isValid() ? parsedDate.format('DD-MM-YYYY') : 'N/A';
};

const CardFooter: React.FC<{
    created_by: string, created_at: string
    updated_by?: string, updated_at?: string
}> = ({
    created_by,
    created_at,
    updated_by,
    updated_at
}): JSX.Element => (
        <div className='course-card-footer' >
            <div style={{ width: "70%" }} >
                <label className='created-label' >Created / Updated By:</label>
                <div className='created-content' >{updated_by ? updated_by : created_by}</div>
            </div>
            <div style={{ width: "30%" }} >
                <label className='created-label' >Created / Updated At:</label>
                <div className='created-content' >{formatDate(updated_at || created_at)}</div>
            </div>
        </div>
    );

const CardView: React.FC<{ courses: ICourse[] }> = ({ courses }): JSX.Element => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCardClick = (course: any) => {
        dispatch(setSelectedCourse(course));
        navigate(`/home/course/${course.course_id}`);
    };

    return <div className='card-view' >
        {courses.map((crc: any, index: number) => {
            return (
                <div className='course-card' key={index} onClick={() => handleCardClick(crc)} >
                    <div>
                        <div className='course-name' >{crc.course_name}</div>
                        <div className='course-description' >{crc.course_desc}</div>
                        <DurationDisplay duration={crc.course_duration} />
                        <TechStackDisplay techStack={crc.tech_stack} />
                    </div>
                    <CardFooter
                        created_by={crc.created_by}
                        created_at={crc.created_at}
                        updated_by={crc.updated_by}
                        updated_at={crc.updated_at}
                    />
                </div>
            )
        })}
    </div>;
};

export default CardView;