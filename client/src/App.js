
import './App.css';
import {
  Routes, Route, useNavigate, Navigate, Outlet
} from "react-router-dom";
import Welcome from './pages/welcom/Welcome';
import MenuAppBar from './components/fixed/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import { useEffect, useState } from 'react';
import { setAuth } from './reducers/slices/Auth';
import Dashboard from './pages/dashbord/Dashboard';
import CreateTasks from './pages/tasks/CreateTasks';
import AvailableTasks from './pages/tasks/AvailableTasks';
import Loading from './components/fixed/Loading';
import Subscriptions from './pages/subscribtion/Subscriptions';
import CouponGenerate from './pages/generatecoupon/CouponGenerate';
import CouponGenerateFund from './pages/generatecoupon/FundAccount';
import SubscriptionsFund from './pages/subscribtion/FundAccount';
import NOTFOUND from './components/fixed/NotFound';
import CreateAds from './pages/Ads/CreateAds';
import ConfirmWithdraw from './pages/generatecoupon/ConfirmWithdraw';
//import PrivateRoute from './components/fixed/PrivateRoute';


//...

const darkTheme = createTheme({
  palette: {
    mode: 'light',
  },
});


function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth)
  const navigator = useNavigate()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const token = sessionStorage.getItem('earninggig');
    const getUserAuth = (token) => {
    //  console.log(auth)
      if (token && !auth.auth) {
       // console.log(token)
        dispatch(setAuth(token))
        setLoading(false)
       // navigator('/dashboard')
        return
      } else {
        if (!auth.auth) {
          dispatch(setAuth(false))
          setLoading(false)
          navigator('/')
        }
        return
      }
    }
      getUserAuth(token)
    
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])


  


  const ProtectedRoute = ({ user, redirectPath = '/login' }) => {
    if (!user) {
      return <Navigate to={redirectPath} replace />;
    }
  
    return <Outlet />;
  };
  if (loading) {
  return <Loading/>
}
  return (
   
    <ThemeProvider theme={darkTheme}>
      <div className="App">
      <MenuAppBar />
        {
          <Routes>
            <Route index path="/" element={<Welcome />} />
            
            <Route path="/login" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
            <Route path="/refer/:name" element={<Register />} />
                <Route element={<ProtectedRoute user={auth.auth} />}>
                  <Route path="/subscribe" element={<Subscriptions />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/fund-account" element={<SubscriptionsFund />} />
                  <Route path="/create-tasks" element={<CreateTasks />} />
              <Route path="/tasks" element={<AvailableTasks />} />

              <Route path="/post-ads" element={<CreateAds />} />

            </Route>
            <Route element={<ProtectedRoute user={auth.user.adm} />}>
              <Route path="/generate-coupon-code" element={<CouponGenerate />} />
              <Route path="/confirm-withdraw" element={<ConfirmWithdraw />} />
              <Route path="/generate-coupon-fund" element={<CouponGenerateFund />} />
            </Route>
            
           
            <Route path="*" element={<NOTFOUND/>} />
          </Routes>
        }
      </div>
      </ThemeProvider>
     
    
  );
}

export default App;
