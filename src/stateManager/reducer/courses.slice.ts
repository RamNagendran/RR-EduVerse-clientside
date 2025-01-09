import { createSlice } from "@reduxjs/toolkit";

const courses = createSlice({
    name: "Courses",
    initialState: {
        courses: null,
        selectedCourse: null
    },
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload.courses
        },
        setSelectedCourse: (state, action) => {
            state.selectedCourse = action.payload
        }
    }
})

export const { setCourses, setSelectedCourse } = courses.actions;
export default courses.reducer;