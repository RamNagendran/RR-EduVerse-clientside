import { createSlice } from "@reduxjs/toolkit";



const task = createSlice({
    name: "Task",
    initialState: {
        categories: null,
        selectedTask: null,
        selectedTask_forEdit: null
    },
    reducers: {
        setSelectedTask: (state, action) => {
            state.selectedTask = action.payload.selectedTask
        },
        setTask_forEdit: (state, action) => {
            state.selectedTask_forEdit = action.payload.data
        },
        setCategories: (state, action) => {
            state.categories = action.payload.data
        }
    }
})

export const {setSelectedTask, setTask_forEdit} = task.actions;
export default task.reducer;
