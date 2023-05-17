import { createSlice } from '@reduxjs/toolkit' 

const initialState:{value:boolean|null} = {
  value:null
}

export const connectSlice = createSlice({
  name: 'connectionStatus',
  initialState,
  reducers: {
    connect: state => {state.value = true},
    disconnect: state => {
      localStorage.setItem("ASP_AT","")
      state.value = false
    }
  }
})

// Action creators are generated for each case reducer function
export const { connect, disconnect } = connectSlice.actions

export default connectSlice.reducer