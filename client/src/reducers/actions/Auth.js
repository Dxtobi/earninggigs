//import { useDispatch } from "react-redux";
import setAuthToken, { instance } from "../../utils/axiosDefault"
//import { setAuth } from "../slices/Auth";



//get-withdraw-request


export const myReferrers = async (data) => {

   const d = await instance.get('/get-user-referrers/'+data)
   .then(res => {
        console.log(res.data)
       return res.data
    } )
    .catch( err =>
    { 
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
 };

 export const TopPointers = async () => {

   const d = await instance.get('/get-top-users-point/')
   .then(res => {
        console.log(res.data)
       return res.data
    } )
    .catch( err =>
    { 
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
};
export const addPoint = async (data) => {

   const d = await instance.post('/add-user-point/', data)
   .then(res => {
        console.log(res.data)
       return res.data
    } )
    .catch( err =>
    { 
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
 };

export const register = async (data) => {

    const d = await instance.post('/register', data)
    .then(res => {
         console.log(res.data)
        return res.data
     } )
     .catch( err =>
     { 
      console.log(err)
        return {status:'false', message:'something went wrong'}
     }
       );

    return d
  };


export const login = async (data) => {
   
    const d = await instance.post('/login', data)
       .then(res => {
         console.log(res.data)
            if (res.data.token) {
                console.log(res.data.token)
                setAuthToken(res.data.token)
//setAuth(res.data.token)
            }
        return res.data
     } )
       .catch(err =>
     
       { 
          console.log(err)
        return {status:'false', message:'something went wrong'}
     }
       );

    return d
  };

export const getCurrentUser = async (data) => {
   
   const d = await instance.post('/get-user', data)
      .then(res => {
           if (res.data.token) {
               setAuthToken(res.data.token)
           }
       return res.data
    } )
    .catch( err =>
    { 
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
 };

export const confirmCoupon = async (data) => {

   const d = await instance.post('/confirm-coupon', data)
      .then(res => {
               console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
};

export const confirmCouponFund = async (data) => {

   const d = await instance.post('/confirm-coupon-fund', data)
      .then(res => {
               console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
};

 export const generateCoupon = async (data) => {

   const d = await instance.post('/generate-coupon', data)
      .then(res => {
               console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
};
 
export const generateCouponFund = async (data) => {

   const d = await instance.post('/generate-coupon-fund', data)
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong'}
    }
      );

   return d
};
 

export const confirmTask = async (data) => {

   const d = await instance.post('/confirm-tasks', data)
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
};
 
export const performTask = async (data) => {

   const d = await instance.post('/perform-tasks', data)
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
 };

export const approveTask = async (data) => {
   const d = await instance.post('/approve-tasks', data)
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
 };

 export const withdraw = async (data) => {
   const d = await instance.post('/make-withdraw', data)
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
 };


 
export const getActivities = async () => {
   const d = await instance.get('/get-activities')
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
};
 
export const getTopUsers = async () => {
   const d = await instance.get('/get-top-users')
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
 };
//

export const getLastTrans = async (id) => {
   const d = await instance.get('/get-withdraw/'+id)
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
 };

 export const getAllLastTrans = async () => {
   const d = await instance.get('/get-withdraw-request/')
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
 };

 export const confirmWithdraw = async (data) => {
   const d = await instance.post('/confirm-withdraw', {id:data})
      .then(res => {
               //console.log(res.data)
               //setAuthToken(res.data.token)
       return res.data
    } )
    .catch( err =>
    {
       console.log(err)
       return {status:'false', message:'something went wrong>>'+err}
    }
      );

   return d
};
//