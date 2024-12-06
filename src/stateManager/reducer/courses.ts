import { createSlice } from "@reduxjs/toolkit";

const courses = createSlice({
    name: "Courses",
    initialState: {
        courses: null
    },
    reducers: {
        setCourses: (state, action) => {
            state.courses = action.payload.courses
        }
    }
})

export const {setCourses} = courses.actions;
export default courses.reducer