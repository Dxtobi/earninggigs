//getTasks

import { useState, useEffect } from 'react';
import { getTasks } from '../../reducers/actions/CreateActions';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YoutubeIcon from '@mui/icons-material/YouTube';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import moment from 'moment'

import { useSelector } from 'react-redux';

//import { useNavigate } from 'react-router-dom';

import './create.css'
import { performTask } from '../../reducers/actions/Auth';
import Loading from '../../components/fixed/Loading';

function AvailableTasks() {

    //const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
    console.log( user)
    const [tasks, setTasks] = useState(null)
    const [type, setType] = useState(1)
    const [expired, setExpired] = useState(false)
    useEffect(() => {
      
        
        callTasks()
        checkTasksTimeOnUpdate()
        if (user.user.subscription === 'no sub') {
            return setType(2)
        }else if (user.user.subscription === 'BASIC') {
            return setType(100)
        }else if(user.user.subscription === 'GOLD') {
            return setType(200)
        }
        else if (user.user.subscription === 'DIAMOND') {
            return setType(400)
        } else {
            return setType(50)
        }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const callTasks = async () => {
    const d = await getTasks(user.user._id)
    console.log(d)
    if (d.status===true) {
        setTasks(d.data)
    }
  }
  const checkTasksTime = () => {
    
    let now = new Date().getTime()
      let setupTime = JSON.parse(localStorage.getItem('task-time'))
      console.log(setupTime)
      if (setupTime === null) {
        
        localStorage.setItem('task-time', JSON.stringify({time:now, count:1}))
      } else {
        console.log( now, setupTime.time)
        const startDate = moment(setupTime.time);
        const timeEnd = moment(now);
        const diff = timeEnd.diff(startDate);
        const diffDuration = moment.duration(diff);
          if (setupTime.count === 0 && diffDuration.days()<1) {
            localStorage.setItem('task-time', JSON.stringify({time:now, count:setupTime.count+1}))
        }else
          if (setupTime.count === 1 && diffDuration.days()<1) {
            localStorage.setItem('task-time', JSON.stringify({time:now, count:setupTime.count+1}))
              setExpired(true)
        }else
          if (setupTime.count === 2 && diffDuration.days()<1) {
              setExpired(true)
          }else if (diffDuration.days()>1) {
            localStorage.removeItem('task-time')
            localStorage.setItem('task-time', JSON.stringify({time:now, count:0}))
      }
    }
    }
    const checkTasksTimeOnUpdate = () => {
       
        let now = new Date().getTime()
          let setupTime = JSON.parse(localStorage.getItem('task-time'))
          
          if(setupTime === null) {
            localStorage.setItem('task-time', JSON.stringify({time:now, count:0}))
          } else {
            console.log( now, setupTime.time)
            const startDate = moment(setupTime.time);
            const timeEnd = moment(now);
            const diff = timeEnd.diff(startDate);
            const diffDuration = moment.duration(diff);

            console.log("Days:", diffDuration.days());


              if (setupTime.count === 2 && diffDuration.days() < 1) {
                  console.log('expired-1')
                  setExpired(true)
              }
              if (setupTime.count === 2 && diffDuration.days() === 1) {
                console.log('expired-2')
                setExpired(false)
                localStorage.setItem('task-time', JSON.stringify({time:now, count:0}))
            }
            if (diffDuration.days() > 1) {
              console.log('expired-3')
              setExpired(false)
              localStorage.setItem('task-time', JSON.stringify({time:now, count:0}))
          }
              
        }
        }
    const handleClickTask = async (e) => {


      setTasks(null)
        const data = {
            id: e._id,
            user: user.user._id,
            earned:type
        }
        const res = await performTask(data)
        console.log(res)
        if (res.status) {
            console.log(res)
          checkTasksTime()
          callTasks()
         //   return navigate('/confirm-task')
        }
    }

    function add(arr, id) {
//console.log(arr.user,'----', id)
      const found = arr.some(el => el.user === id);
      console.log(found)
      return found;
    }
  if (expired) {
      return (

        <div className='page'>
          <div className='page-inner'>
            <h3>TASKS COMPLETED <br/> FOR THE DAY</h3>
          </div>
        </div>
      )
    }

  if (tasks === null) {
 return <Loading/>
}
  return (
    <div className='page'>
          <div className='page-inner'>
              {
                expired && <div>Expired</div>
        }
        <div>Completed tasks would be confirmed before withdrawal is approved.</div>
        <br />
        <br/>
              {
          tasks.map((e, i) => {
              //console.log(e.doneBy, user.user)
                    
                      return (
                          <div key={i}>
                            <div   className={`task-list ${e.platform}`} >
                                <div>
                                    <div><b>Earn ₦{type}</b> for this Task</div>
                                    <div>{e.type} on {e.platform}</div>
                                </div>
                                <div className='icon-container'>
                                    {e.platform === 'TWITTER' && <TwitterIcon />}
                                    {e.platform === 'FACEBOOK'&&<FacebookIcon/>}
                                    {e.platform === 'INSTAGRAM' && <InstagramIcon />}
                                    {e.platform === 'YOUTUBE' && <YoutubeIcon />}
                                    {e.platform === 'WHATSAPP' && <WhatsAppIcon />}
                                </div>
                              </div>
                             { !add(e.doneBy, user.user._id)&& e.paying > 50 && <div className='task-list-footer'>
                                  <button onClick={()=>handleClickTask(e)} className='task-list-btn'>ALREADY DID THIS</button>
                                  <a className='task-list-a' target='_blank' href={e.link} rel="noreferrer">EARN ₦{type}</a>
                              </div>}
                          </div>
                      )
                  })
       }
      </div>
    </div>
  );
}
//myRef3
export default AvailableTasks;
