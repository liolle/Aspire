import { createSlice } from '@reduxjs/toolkit' 

export const connectSlice = createSlice({
  name: 'connectionStatus',
  initialState: {
    value: false
  },
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