import { configureStore } from '@reduxjs/toolkit'

import counterReducer from '../feature/counter'

import connectReducer  from '../feature/user'

import modelListReducer from '../feature/modelList'

export default configureStore({
  reducer: {
    counter: counterReducer,
    connectStatus: connectReducer,
    modelList:modelListReducer
    
  }
})