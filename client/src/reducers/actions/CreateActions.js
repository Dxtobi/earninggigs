//import { useDispatch } from "react-redux";
import { instance } from "../../utils/axiosDefault"
//import { setAuth } from "../slices/Auth";




//get-tasks


export const createAction = async (data) => {
   console.log(data)
    const d = await instance.post('/create-ads', data)
       .then(res => {
         console.log(res.data)
            if (res.data) {
              
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

export const getTasks = async (id) => {
   
     const d = await instance.get('/get-tasks/'+id)
        .then(res => {
         return res.data
      } )
      .catch( err =>
      { 
         return {status:'false', message:'something went wrong'}
      }
        );
 
     return d
};

export const spinResult = async (data) => {
   console.log(data)
    const d = await instance.post('/create-ads', data)
       .then(res => {
         console.log(res.data)
            if (res.data) {
              
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
