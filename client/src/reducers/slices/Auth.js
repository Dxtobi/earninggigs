import { createSlice } from '@reduxjs/toolkit'
import setAuthToken from '../../utils/axiosDefault'
import jwt_decode from 'jwt-decode';

const initialState = {
  auth: false,
  user:{},
  status: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      //console.log(action.payload)
        if(!action.payload){
          return
        }
      state.auth = action.payload
      state.user = jwt_decode(action.payload)
      setAuthToken(action.payload)
      sessionStorage.setItem('earninggig', action.payload)
    },
    clearAuth(state, action) {
      sessionStorage.removeItem('earninggig')
      setAuthToken(false)
      state.auth = false
     },
    authLoading(state, action) {
      return {
        ...state,
        status: 'loading'
      }
    }
  }
})


export const { authLoading, setAuth, clearAuth } = authSlice.actions

export default authSlice.reducer


