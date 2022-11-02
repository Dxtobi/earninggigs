import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/Auth';
import createAds from './slices/CreateAds';


export default configureStore({
    reducer: {
    auth: authReducer,
    ads:createAds
  },
});