import { createSlice } from '@reduxjs/toolkit'

const heightSlice = createSlice({
    name: 'height',
    initialState: {
        height: 0
    },
    reducers: {
        setHeight: (state, action) => {
            state.height = action.payload
        }
    }
})

export const { setHeight } = heightSlice.actions

export default heightSlice.reducer