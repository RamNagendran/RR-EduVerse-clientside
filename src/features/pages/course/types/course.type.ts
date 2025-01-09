export interface IBaseResponse<T = null> {
    status: number;
    success: boolean;
    message: string;
    data?: T;
}

interface ICourseBase {
    course_name: string;
    course_desc: string;
    course_duration: number;
    tech_stack: string[];
}

export interface IAddCourse extends ICourseBase {
    created_by: string;
    created_at?: string;
}

export interface IUpdateCourse extends Partial<ICourseBase> {
    course_id: string;
    updated_by: string;
    updated_at: string;
    auth_email?: string;
    auth_password?: string;
}

export interface ICourse extends ICourseBase {
    course_id?: number;
    created_by?: string;
    created_at?: string;
    updated_by?: string;
    updated_at?: string;
}

export interface IAddCourseActions {
    openAddCourseModal: boolean;
    setOpenAddCourseModal: React.Dispatch<React.SetStateAction<boolean>>;
    addCourseDetails: IAddCourse;
    setAddCourseDetails: React.Dispatch<React.SetStateAction<IAddCourse>>;
    handleAddCourse: () => void;
}