import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import {
  useSelector
} from 'react-redux';
import Wheel from './wheel';
import { addPoint, getCurrentUser, TopPointers } from '../../reducers/actions/Auth';
import './Spinner.css';
import { LinearProgress } from '@mui/material';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import moment from 'moment';
const places = ['10 POINTS', 'NO POINTS', '2 POINTS', 'NO POINTS', '1 POINTS', '5 POINTS', 'NO POINTS', 'NO POINTS'];
const point = [10, 0, 2, 0, 1, 5, 0, 0];

function Spinner() {

  const auth = useSelector((state) => state.auth);
  const [user, setUser] = useState(null)
  const [topusers, setTopUser] = useState(null)
  const [notExusted, setnotExusted] = useState(true)
  const [loading, setLoading] = useState(true)

   useEffect(() => {

     getUser()
   // eslint-disable-next-line react-hooks/exhaustive-deps
   },[])

  async function getUser() {
     setLoading(true)
    const data = await getCurrentUser({ email: auth.user.email })
    const data1 = await TopPointers()
    console.log(data1)
    if (data.status) {
     const nUser = jwt_decode(data.token);
      setUser(nUser)
   }
    if (data1.status) {
     setTopUser(data1.data)
    }
    if (data1.status && data.status) {
      setLoading(false)
    }
  }
  useEffect(() => {
     if(user !== null){
       setnotExusted(checkDate)
     }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[user])
  const checkDate = ()=> {
    const date = new Date().getTime()
    const oldDate = moment(parseInt(user.lastDatePoint));
    const newTime = moment(date);
    const diff = newTime.diff(oldDate);
    const diffDuration = moment.duration(diff);
    if (diffDuration.days() < 1) {
      return false
    } else {
      return true
    }
  }
  const onSelectItem = async (e) => {
  
   const data = {
     points: point[e],
     id: user._id
      }

    if (notExusted) {
      setTimeout(async () => {
        setLoading(true)
        const d = await addPoint(data)
        if (d.status === true) {
          getUser()
        }
      }, 7500);
     
    } else {
      return
   }
  }

  if (user === null || user === undefined || topusers === null || topusers === undefined || loading) {
    return <div className="page">
      <div className="page-inner"><LinearProgress color='success'/></div>
    </div>
  }

    return (
      <div className="page">
            <div className='page-inner wheel-bg'>
          <h1 style={{ textAlign: 'center' }}>SPIN TO<br />EARN POINT</h1>
          {
            notExusted && <Wheel onSelectItem={onSelectItem} user={user} items={places} />
          }
                
                <h4 style={{color:'white', textAlign:'center'}}>
                  You only <br/> have one spin for the day.
          </h4>

          <div className='top-users-table-item'>
              <div className='top-user-name'>Your Total Point</div>
              <div className='top-user-point'>{user.points} POINTS <ModeStandbyIcon/></div>
          </div>
          <div className='top-users-table'>
            <div className='top-users-table-header'>TOP SPINNERS</div>
            <div className='top-users-table-body'>
              {
                topusers.map((e, i)=>{
                  return (
                    <div key={i} className='top-users-table-item'>
                      <div className='top-user-name'>{e.name}</div>
                      <div className='top-user-point'>{e.points} POINTS <ModeStandbyIcon/></div>
                    </div>
                  )
                })
              }
            </div>
          </div>
            </div>
      </div>
    );
  }


export default Spinner