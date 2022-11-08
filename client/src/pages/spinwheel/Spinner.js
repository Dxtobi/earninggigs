import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import {
  useSelector
} from 'react-redux';
import Wheel from './wheel';
import { getCurrentUser } from '../../reducers/actions/Auth';
import './Spinner.css';
import { LinearProgress } from '@mui/material';
const places = ['0', '0', '0', '0', '0', '10', '0', '0'];
function Spinner() {

  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState(null)

   useEffect(() => {
     async function getUser() {
       const data = await getCurrentUser({ email: auth.user.email })
       if (data.status) {
        const nUser = jwt_decode(data.token);
        setUser(nUser)
      }
     }

     getUser()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

 const onSelectItem=(e)=>{
      console.log(e)
  }

  if (user === null || user === undefined) {
    return <div className="page">
      <div className="page-inner"><LinearProgress color='success'/></div>
    </div>
  }

    return (
      <div className="page">
       
            <div className='page-inner wheel-bg'>
                <h1 style={{textAlign:'center'}}>EARN POINT</h1>
                <Wheel onSelectItem={onSelectItem} items={places} />
            </div>
      </div>
    );
  }


export default Spinner