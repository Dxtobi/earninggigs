import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    ads: {},
    adss:[],
    status: null
}

const createAds = createSlice({
  name: 'ads',
  initialState,
  reducers: {
    setAds(state, action) {
      console.log(action.payload)
        if(!action.payload){
          return
        }
        return state.ads = action.payload
    },
    setAdss(state, action) {
        return state.setAdss = action.payload
        
     },
  }
})


export const { authLoading, setAuth, clearAuth } = createAds.actions

export default createAds.reducer


