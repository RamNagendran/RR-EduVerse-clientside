import React, { useCallback, useEffect, useState } from "react";
import './scss/index.scss';
import CardView from "./card-view";
import SearchIcon from '../../../../assets/images/SVGs/search.svg';
import AddCourse from "./add-course";
import { IAddCourse, IBaseResponse, ICourse } from "../types/course.type";
import { addCourseAPI, fetchCourses } from "../api/course-api";
import { useSelector } from "react-redux";
import { RootState } from "../../../../stateManager/types";
import Nodata from '../../../../assets/images/SVGs/noData.svg';
import moment from "moment";

type IResponse = IBaseResponse<ICourse[]> | IBaseResponse;

const TITLE = 'Course Management';
const DESCRIPTION = `Unlock the potential of teaching with our comprehensive course management platform.`
const ADD_COURSE_INITIALS = {
    course_name: '',
    course_desc: '',
    course_duration: 0,
    tech_stack: [],
    created_by: '',
    created_at: ''
}

const Course: React.FC = (): JSX.Element => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [openAddCourseModal, setOpenAddCourseModal] = useState(false);
    const [addCourseDetails, setAddCourseDetails] = useState<IAddCourse>(ADD_COURSE_INITIALS);
    const [courses, setCourses] = useState<ICourse[]>([]);
    const [coursesBackup, setCoursesBackup] = useState<ICourse[]>([]);
    const [preFetch, setPreFetch] = useState({ loading: false, message: '' });
    const [searchData, setSearchData] = useState<string>('');

    const getAllCourses = useCallback(async () => {
        setPreFetch({ loading: true, message: '' });

        const res: IResponse = await fetchCourses(user.username, user.role_id);
        if (!res.success) {
            setPreFetch({ loading: false, message: res?.message });
            return;
        }

        setPreFetch({ loading: false, message: '' });
        setCourses(res?.data || []);
        setCoursesBackup(res?.data || []);
    }, [user.username, user.role_id]);

    useEffect(() => {
        getAllCourses();
    }, [getAllCourses]);

    const handleAddCourse = async () => {
        addCourseDetails.created_by = `${user.firstname} ${user.lastname}`;
        addCourseDetails.created_at = moment().format('DD/MM/YYYY HH:mm:ss');
        const res: IResponse = await addCourseAPI(user.username, user.role_id, addCourseDetails);
        if (!res.success) return;
        setOpenAddCourseModal(false);
        getAllCourses();
    }


    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        setCourses(coursesBackup);
        if (e.key === 'Enter') {
            e.preventDefault();
            // Trim and convert to lowercase for case-insensitive search
            const searchTerm = searchData.trim().toLowerCase();

            // If search term is empty, show all users
            if (!searchTerm) {
                setCourses(coursesBackup);
                return;
            }

            // Filter users based on multiple search criteria
            const searchResults = courses.filter(course =>
                course.course_name.toLowerCase().includes(searchTerm)
            );

            // Update filtered users
            setCourses(searchResults);

            // Optional: Show message if no results found
            if (searchResults.length === 0) {
                // You might want to use a toast or set a state to show a message
                setPreFetch({ loading: false, message: 'No results found' });
            }

        }
    }

    return (
        <div className="course">
            <div className="crc-header d-flex align-items-center justify-content-between w-100" >
                <div className="d-flex flex-column align-items-start w-75" >
                    <div className="h-title" >{TITLE}</div>
                    <div className="h-decription" >{DESCRIPTION}</div>
                </div>
                <div className="position-relative d-flex align-items-center justify-content-end w-25" >
                    <input className="search-input" placeholder="search by course name or technologies..." type="search"
                        value={searchData || ''}
                        onKeyDown={handleKeyPress}
                        onChange={(e: any) => {
                            setSearchData(e.target.value);
                            if (e.target.value === '') setCourses(coursesBackup)
                        }}
                    />
                    <img style={{ left: 10, top: 7, position: 'absolute' }} height={14} width={14} src={SearchIcon} alt="search" />
                </div>
            </div>
            {courses.length > 0 && <CardView courses={courses} />}
            {!preFetch.loading && courses.length === 0 &&
                <div style={{ height: "90%", marginTop: "20px", backgroundColor: "#fff" }} className='d-flex flex-column align-items-center justify-content-center w-100' >
                    <img style={{ width: '450px', height: '450px' }} src={Nodata} alt="no-data" />
                    {preFetch.message !== '' &&
                        <div style={{ color: '#aeaeae', fontSize: '18px', fontWeight: 700 }} >
                            Something went wrong: {preFetch.message}
                        </div>
                    }
                </div>
            }
            <button className="float-btn" onClick={() => setOpenAddCourseModal(true)}>✛</button>
            {openAddCourseModal && <AddCourse
                openAddCourseModal={openAddCourseModal}
                setOpenAddCourseModal={setOpenAddCourseModal}
                addCourseDetails={addCourseDetails}
                setAddCourseDetails={setAddCourseDetails}
                handleAddCourse={handleAddCourse}
            />}
        </div>
    );
};

export default Course;