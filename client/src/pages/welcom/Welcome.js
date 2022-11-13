import {useRef} from 'react'
import Divider from '../../components/fixed/Divider';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import './welcom.css';
import { Link } from 'react-router-dom';
///import { useSelector } from 'react-redux';



function Welcome() {
  const myRef1 = useRef(null)
  const myRef2 = useRef(null)
  const myRef3 = useRef(null)
  const executeScroll = () => myRef1.current.scrollIntoView()
  const executeScroll1 = () => myRef2.current.scrollIntoView()
  const executeScroll2 = () => myRef3.current.scrollIntoView()
  //const auth = useSelector((state) => state.auth);
//console.log(auth)
  return (
    <div className="page" >
      {
        //WEBSITE INTRO....................
      }
      <div className="page-inner-100p">
        <div className='first-div'>
          <div className='first-div-header-wrapper'>
            <div className='first-div-header'>
              BOOST YOUR <br/> SOCIAL MEDIA ACCOUNTS
            </div>
            <div className='first-div-header1'>
            FAME MAGNET
            </div>
            <div className='first-div-header2'>
              Get real followers, likes, comments and subscribers<br />
              on all your social media platforms.
            </div>
          </div>
          <div className='first-div-header-img'>
            <img alt='' src='/static/images/gain.png' className='first-div-header-img-img'/>
          </div>
        </div>
      </div>
      <div className="page-inner-100p">
        <div className='second-div'>
          <div className='first-div-header-wrapper'>
          <div>
            E - GAMES
          </div>
            <div className='first-div-header'>
              WIN BIG <br/> WITH OUR E-GAMES SECTIONS
            </div>
            <div className='first-div-header1'>
            WIN BIG
            </div>
            <div className='first-div-header2'>
              Stand a chance to win <b style={{color:'white'}}>NGN25K</b> Weekly on our telegram platform.
            </div>
            <button className='win-big-btn' onClick={()=>window.open('https://t.me/officialearninggigs', '_blank')}>JOIN CHANNEL</button>
          </div>
          <div className='first-div-header-img'>
            <img alt='' src='/static/images/win.png' className='first-div-header-img-img'/>
          </div>
        </div>
      </div>
      <div className="page-inner">
          <div className="sectionOne">
              <div className="sectionOne-text-top" style={{fontSize:'xx-large'}}>ITS EASIER WHEN ITS FUN, NOT WORK</div>
              <div className="sectionOne-text">
                The easiest way to make money online is with <span className="special-text">Earngigs</span> we offer our users a variety of task that pays at a reasonable price, out of this many task you would definitely find your best fit.
              </div>
          <button className='scroll-btn' onClick={executeScroll}>HOW IT WORKS?</button>
          <br />
          <br />
          <img src="/static/images/wallet.jfif" alt="" className="sectionOne-img"/>
          </div>
      </div>
      {
        //DESCRIPTIONS....................
      }
      <Divider />
      <div  ref={myRef1} className="page-inner">
          <div className="sectionOne">
            <div className="sectionOne-text-top" style={{textAlign:'end'}}>HOW IT WORKS?</div>
            <div className="sectionOne-text">
              After login in or registering a new account and verification of your account is successful, you would be provided with <span className="special-text">Tasks</span>  to complete, on completion of each <span className="special-text">Task </span> 
               You earn a <span className="special-text">credit</span>, the <span className="special-text">credit</span> value depends on the type of <span className="special-text">subscription</span> you selected.
          </div>
          <button className='scroll-btn' onClick={executeScroll1} style={{background:'black', width:'100%'}}>OVER VIEW</button>
            </div>
      </div>
      <br/>
      <div  className="page-inner">
          <div className="sectionOne">
            <div className="sectionOne-text-top" >NEEDS FOR VERIFICATION PROCESS</div>
              <div className="sectionOne-text">
              To verify your account requires les than two minute, the verification process are both email verification and subscription verification.
              Once you verify by purchasing a subscription you are provided with daily tasks, with credit worth depending on the subscription made.
          </div>
          <button className='scroll-btn' onClick={executeScroll2}>SUBSCRIPTIONS</button>
          <br /><br />
          <img src="/static/images/secure.jfif" alt="" className="sectionOne-img"/>
            </div>
      </div>
      {
        //RATING....................
      }
      <Divider />
      <div  ref={myRef2} className="page-inner">
          <div className="sectionOne">
          <div className="sectionOne-text-top" style={{ textAlign: 'center' }}>RATINGS</div>
          <div className='review-div'>
            <div className='review-div-number' style={{color:'rgb(234 20 129)'}}>6K+</div>
            <div className='review-div-disc'>Download</div>
          </div>
          <br />
          <div className='review-div'>
            <div className='review-div-number' style={{color:'rgb(234 20 129)'}}>4K+</div>
            <div className='review-div-disc'>Active Users</div>
          </div>
          <br />
          <br />
          <div className='review-div'>
            <div className='review-div-number' style={{color:'rgb(148 117 184)'}}>1K+</div>
            <div className='review-div-disc'>Rating</div>
            <div className='rating' style={{color:'rgb(234 20 129)'}}>
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarIcon />
              <StarHalfIcon />
            </div>
          </div>
            </div>
      </div>

      <div className="page-inner">
          <div className="sectionOne">
          <div className="sectionOne-text-top" style={{textAlign:'center'}}>USERS COMMENT</div>
          <div className='review-div-text'>
            <div className='rating' style={{color:'goldenrod'}}>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
            </div>
            <div className='rating-text' >
              I made my first 600k from this app just with time and consistency and data of course.
            </div>
          </div>
          <br />
          <div className='review-div-text'>
            <div className='rating' style={{color:'goldenrod'}}>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarHalfIcon />
                <StarOutlineIcon />
            </div>
            <div className='rating-text' >
              The easiness of this platform is un-doubtable top notch no cap.
            </div>
          </div>
          <br />
          <div className='review-div-text'>
            <div className='rating' style={{color:'goldenrod'}}>
                <StarIcon />
                <StarIcon />
                <StarIcon />
                <StarOutlineIcon />
              <StarOutlineIcon />
              
            </div>
            <div className='rating-text' >
              Three stars because i haven't really make use of this app for long but yap i just got paid my first 40k.
            </div>
          </div>
          </div>
      </div>

      {
        //TYPE OF SUBSCRIPTIONS.......
      }
      <div ref={myRef3} className="page-inner-100p">
      <div className="sectionOne-text-top" style={{textAlign:'center'}}>AVAILABLE SUBSCRIPTIONS</div>
        <div>
        <div className='price-comp'>
          <div className='price-type'>S I M P L E</div>
          <div className='price-amount'>₦1500</div>
          <div className='price-discretion'>
            The return value for each task is at ₦100<br />
            Maximum withdrawal: ₦3000<br/>
            Minimum withdrawal: ₦3000<br/>
          </div>
          <br/>
          <Link className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</Link>
        </div>
        </div>
        <div>
        <div className='price-comp'>
          <div className='price-type'>B A S I C</div>
          <div className='price-amount'>₦5000</div>
          <div className='price-discretion'>
            The return value for each task is at ₦150<br />
            Maximum withdrawal: ₦10000<br/>
            Minimum withdrawal: ₦8000<br/>
          </div>
          <br/>
          <Link className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</Link>
        </div>
        </div>
        <div>
        <div className='price-comp'>
          <div className='price-type'>G O L D</div>
          <div className='price-amount'>₦10000</div>
          <div className='price-discretion'>
            The return value for each task is at ₦300<br />
            Maximum withdrawal: ₦20000<br />
            Minimum withdrawal: ₦15000<br />
          </div>
          <br/>
          <Link className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</Link>
        </div>
         </div>
        
        <div>
        <div className='price-comp'>
        
         <div className='price-type'>D I A M O N D</div>
          <div className='price-amount'>₦30000</div>
          <div className='price-discretion'>
            The return value for each task is at ₦450<br />
            Maximum withdrawal: ₦50000<br />
            Minimum withdrawal: ₦20000<br/>
          </div>
          <br/>
          <Link className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</Link>
         </div>
         
        </div>
      </div>

      {
        //LOGIN OR REGISTER COMPONENT..................
      }
      <div ref={myRef3} className="page-inner-100p" style={{background:'#ffb30e', color:'white'}}>
        <div className="sectionOne-text-top" style={{ textAlign: 'start', fontSize: 'xx-large', padding:30}}>Join 4K+ Happy Users </div>
        <div style={{ textAlign: 'start', padding:30}}>Join Our 4K+ Active Users And Take A Step To Financial Freedom</div>
        <div className='div-tologin-route'>
          <Link to='/register' className='tologin-route'>Join Now</Link>
        </div>
        <br/><br/>
        <div>
          <img src="/static/images/happy1.jfif" alt="" className="sectionOne-img" style={{ margin:'auto'}}/>
        </div>
      </div>
    </div>
  );
}
//myRef3
export default Welcome;
