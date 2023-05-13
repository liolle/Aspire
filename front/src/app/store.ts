import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../feature/counter'

import connectReducer  from '../feature/user'

export default configureStore({
  reducer: {
    counter: counterReducer,
    connectStatus: connectReducer
    
  }
})