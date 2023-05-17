import { createSlice } from '@reduxjs/toolkit' 
import { ModelInfo } from '../utils/types'

const initialState: {value:ModelInfo[]} =  {
  value: []
}

export const modelList = createSlice({
  name: 'modelList',
  initialState,
  reducers: {
    sync: (state, action) => {
      state.value = action.payload
    },
    setSkin: (state, action)=>{
      state.value.forEach(elem=>{
        const {id,color} = action.payload
        if (!id || !color) return 
        if (elem.id == id) elem.skinColor = color
      })
    },
    setHair: (state, action)=>{
      state.value.forEach(elem=>{
        const {id,color} = action.payload
        if (!id || !color) return 
        if (elem.id == id) elem.hairColor = color
      })
    },
    setHeight: (state, action)=>{
      state.value.forEach(elem=>{
        const {id,value} = action.payload
        if (!id || !value) return 
        if (elem.id == id) elem.height = value
      })
    },
    setWeight: (state, action)=>{
      state.value.forEach(elem=>{
        const {id,value} = action.payload
        if (!id || !value) return 
        if (elem.id == id) elem.weight = value
      })
    }
  }
})

// Action creators are generated for each case reducer function
export const { sync,setSkin,setHair,setHeight,setWeight } = modelList.actions

export default modelList.reducer