import { createSlice } from '@reduxjs/toolkit'

const dataSlice = createSlice({
    name: "data",
    initialState: {
        categories: [],
        contents: [],
        selectedContent: {}
    },
    reducers: {
        fetchData: (state, action) => {
            const { categories } = action.payload

            state.categories = categories
            // state.contents = contents
        },
        updateContents: (state, action) => {
            state.contents = action.payload
        },
        updateDetails: (state, action) => {
            state.selectedContent = action.payload
        }
    }
})

export const { fetchData, updateContents, updateDetails } = dataSlice.actions

export default dataSlice.reducer