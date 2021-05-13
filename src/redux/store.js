import { configureStore } from "@reduxjs/toolkit"

import heightReducer from './heightReducer'
import dataReducer from './dataReducer'

export default configureStore({
    reducer: {
        height: heightReducer,
        data: dataReducer
    }
})