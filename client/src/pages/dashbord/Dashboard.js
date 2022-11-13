
import {useEffect, useState} from 'react'

import './dashboard.css'
import {
  //useDispatch,
  useSelector
} from 'react-redux';
import { Link } from 'react-router-dom';
import SalesAndServices from '../../components/market/SalesAndServices';
import RecentActivities from '../../components/market/ResentActivities';
import FundAccounts from '../../components/market/FundAccounts';
import { getCurrentUser, getLastTrans } from '../../reducers/actions/Auth';
import jwt_decode from 'jwt-decode';
import Withdraw from '../../components/market/Withdraw';
import Loading from '../../components/fixed/Loading';
import moment from 'moment';
import PaidIcon from '@mui/icons-material/Paid';

//const defaultSub = "no sub"
function Dashboard() {
  
  const [fundMenu, showFundMenu] = useState(false)
  const [loading, setLoading] = useState(true)
  const [fundWithddraw, showWithdrawMenu] = useState(false)
  const [payday, setPayday] = useState(false)
  const [user, setUser] = useState({})
  const [transLast, setUserTrans] = useState({})
    const auth = useSelector((state) => state.auth);
    //const {name, currentBallance, subscription, email} = user
    
  //const navigate = useNavigate()
 
  
  async function callUpdateUser(){
    const d = await getCurrentUser({ email: auth.user.email });
    const d1 = await getLastTrans(auth.user._id)
    if (d1.status) {
      setUserTrans(d1.data)
      console.log(d1)
    }
    if (d.status) {
      setLoading(false)
      const user = jwt_decode(d.token);
      setUser(user)
      const date = new Date().getTime()
      const oldDate = moment(parseInt(user.lastDateSub));
      const newTime = moment(date);
      const diff = newTime.diff(oldDate);
      const diffDuration = moment.duration(diff);
      if (user.subscription !== 'SIMPLE' && diffDuration.days() > 29) {
        setPayday(true)
      } else if (user.subscription === 'SIMPLE' && diffDuration.days() < 6){
        setPayday(true)
      } else {
        setPayday(false)
      }
      
    }
    
   
    return
  }


  useEffect(() => {

    callUpdateUser()
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  

  if (loading) {
    return <Loading/>
  }
  return (
      <div className="page" >
      <div className="page-inner" >
        {fundWithddraw && <Withdraw showWithdrawMenu={showWithdrawMenu} />}
        <div className='header-section-dash'>
          <div className='header-section-dash-text' style={{color:'gray'}}><div>{user.subscription}</div></div>
          <div className='header-section-dash-text' ><div>{user.name}</div></div>
            
          <div className='header-section-dash-price'>
             <div className='header-section-dash-price-inner'>
                <div style={{color:'gray'}}>Total Balance</div>
                <div style={{fontSize:'xx-large'}}>₦{parseFloat(user.totalEarning)+parseFloat(user.currentBallance)}</div>
             </div>
           
          </div>
          <div className='header-section-dash-inline'><div>Total Earnings</div><div>₦{parseFloat(user.totalEarning)}</div></div>
                      <div className='header-section-dash-inline'><div>Wallet</div><div>₦{parseFloat(user.currentBallance)}</div></div>
              </div>
              <div className='funds-btn'>
                  <button onClick={()=>showFundMenu(true)} className='funds-btn-fund'>FUND</button>
                  {payday&&<button onClick={()=>showWithdrawMenu(true)} className='funds-btn-fund'>WITHDRAW</button>}
        </div>
       { transLast && <h4>Last Transactions</h4>}
        {transLast &&
          <div className={`transfers ${transLast.status}`}>
          <div>{transLast.status}</div>
        </div>
        }
        
        <div className='display-flex__'>
          {
            user.subscription ==="no sub" ? (<Link to='/subscribe' className='task-and-promotion linear-bg'>
                  Subscribe To Start Earning
            </Link>) : (
                <Link to='/tasks' className='task-and-promotion linear-bg'>
                  <div style={{fontSize:'x-large'}}>Earn</div>
                  <br/><br/>
            <PaidIcon style={{ fontSize: 40 }} />
            <br/><br/>
                  <div >Get started</div>
                </Link>
                )
            }
              <Link to='/create-tasks' className='task-and-promotion linear-bg1'>
                    <div style={{fontSize:'x-large'}}>Boost</div>
                    <br/><br/>
            <PaidIcon style={{ fontSize: 40 }} />
            <br/><br/>
                    <div >Get started</div>
              </Link>
       </div>
              {/*<div className='pesist-div'>
                  <div>Advertise with us</div>
                  <button className='pesist-div-btn' onClick={()=>navigate('/post-ads')}>Post Advert</button>
              </div>*/}
              <br />
              <br/>
              <div className='pesist-div'>
                  <div>Top Earners on Earninggigs.com</div>
              </div>
              
            
             


                {
                  fundMenu && <FundAccounts showFundMenu={showFundMenu} />
                }
      </div>
      <SalesAndServices />
      <div className="page-inner" >
      <div style={{
        textAlign:'center'
      }}>
          <h3>REEFER AND EARN</h3>
          <div>Use the link and image below to reefer your friends and get 10% every time your friends purchase a subscription</div>
        </div>
        <br />
        <div className='ref-div'><button onClick={()=>window.open('/referrers')} className='funds-btn-fund'>My Referrance</button></div>
        <br />
        <br/>
        <img alt='' src='/static/images/egigs.png' className='reefer-img' />
        <br/>
      <div className='site-link-reefer'>https://{window.location.hostname}/referer/{auth.user._id}</div>
      </div>
   
      <div className="page-inner" >
      <div className='pesist-div'>
        <div>Recent Activities</div>
      </div>
      <RecentActivities/>
      </div>
      
      </div>
      
  );
}
//myRef3
export default Dashboard;
