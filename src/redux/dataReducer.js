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
        }
    }
})

export const { fetchData } = dataSlice.actions

export default dataSlice.reducer