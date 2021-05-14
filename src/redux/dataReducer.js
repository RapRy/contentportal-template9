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
            const { categories, contents } = action.payload

            state.categories = categories
            state.contents = contents
        },
        updateContents: (state, action) => {
            state.contents = action.payload
        }
    }
})

export const { fetchData, updateContents } = dataSlice.actions

export default dataSlice.reducer