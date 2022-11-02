import { useState, useEffect } from 'react';
import { createAction } from '../../reducers/actions/CreateActions';


import { useSelector } from 'react-redux';

import { useNavigate } from 'react-router-dom';

import './create.css'

function CreateTasks() {

  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate()
  console.log(auth)
  const [socialMediaType, setSocialMediaType] = useState('')
  const [activityType, setActivityType] = useState('')
  const [socialLink, setLink] = useState('')
  const [ammount, setAmmount] = useState(0)
  const [paying, setPaying] = useState('')
  const [error, setError] = useState({})
  useEffect(() => {
    console.log(socialMediaType, activityType, socialLink, ammount)
    if (socialMediaType === 'SELECT' || socialMediaType === '') {
      return setError({socialMediaType:'Select Platform This Field Is Reqired'})
    }
    if (activityType === 'SELECT'||activityType === '') {
      return setError({activityType:'Select Activity This Field Is Reqired'})
    }
    if (socialLink === '') {
      return setError({socialLink:'Enter Link This Field Is Reqired'})
    }
    return setError({})
  }, [socialMediaType, activityType, socialLink, ammount])

  useEffect(() => {
    const amount = parseInt(ammount) * 4
    if (isNaN(amount)) {
      return setPaying(0)
    }
    
    setPaying(amount)
  }, [ammount])

  const enterNewAdvert = async () => {
    if (socialMediaType === 'SELECT' || socialMediaType === '') {
      return setError({socialMediaType:'Select Platform This Field Is Reqired'})
    }
    if (activityType === 'SELECT'||activityType === '') {
      return setError({activityType:'Select Activity This Field Is Reqired'})
    }
    if (socialLink === '') {
      return setError({socialLink:'Enter Link This Field Is Reqired'})
    }

    //console.log('enterd')
    if (currentBallance < paying) {
      return setError({surrency:'YOU DO NOT SUFFICENT FUNDS'})
    }
    const res = await createAction({ type: activityType, platform: socialMediaType, link: socialLink, paying: paying, uid:auth.user._id })
    if (res.status) {
     return navigate('/dashboard')
    } else {
      return  setError({surrency:res.message})
    }
  }
const { currentBallance} = auth.user
console.log(auth)
  return (
    <div className='page'>
      <div className='page-inner'>
        <div className=''>
          <h3>ADVERT FORM</h3>
          {error.activityType && <small style={{ color: 'red' }}>{error.activityType}</small>}
          {error.socialLink && <small style={{ color: 'red' }}>{error.socialLink}</small>}
          {error.socialMediaType && <small style={{color:'red'}}>{error.socialMediaType}</small>}
          
          <br/>
          <div className='Label'>Select Platform</div>
          <div className='input-holder'>
            <select  onChange={(e) => setSocialMediaType(e.target.value)} className='input-input'>
            <option value={'SELECT'}>SELECT</option>
              <option value={'FACEBOOK'}>FACEBOOK</option>
              <option value={'TWITTER'}>TWITTER</option>
              <option value={'YOUTUBE'}>YOUTUBE</option>
              <option value={'INSTAGRAM'}>INSTAGRAM</option>
              <option value={'TELEGRAM'}>TELEGRAM</option>
              <option value={'WHATSAPP'}>WHATSAPP</option>
              <option value={'AUDIOMACK'}>AUDIOMACK</option>
              <option value={'GOOGLE PLAY'}>GOOGLE PLAY</option>
              <option value={'TIKTOK'}>TIKTOK</option>
              <option value={'APPLE STORE'}>APPLE STORE</option>
            </select>
          </div>
          
          <br />
          <div className='Label'>Type Of Activity</div>
          <div className='input-holder'>
            <select  onChange={(e) => setActivityType(e.target.value)} className='input-input'>
              <option value={'SELECT'}>SELECT</option>
              <option value={'follow'}>get more followers</option>
              <option value={'like'}>get more likes</option>
              <option value={'comment'}>get more comments</option>
              <option value={'download and review'}>get more downloads and reviews</option>
              <option value={'repost or retweet'}>get more repost or retweet</option>
              <option value={'join'}>join</option>
            </select>
          </div>
          
          <br/>
          <div className='Label'>No. of reactions you want</div>
          <div className='input-holder'>
            <input type={'number'} onChange={(e) => setAmmount(e.target.value)} placeholder='No. of followers' className='input-input'/>
          </div>
          <br />
          <div className='Label'>Link</div>
          <div className='input-holder'>
            <input type={'link'} value={socialLink} onChange={(e) => setLink(e.target.value)} placeholder='platform link' className='input-input'/>
          </div>
          
        </div>
        <br />
        <br />
        <br />
        <br/>
        <div className='floating-footer'>
          <div className='fl-div1'>
          {error.surrency && <small style={{color:'red'}}>{error.surrency}</small>}
            <small>paying:</small>
            <div style={{fontSize:'x-large'}}><b>₦{paying}</b></div>
          </div>
          <button onClick={enterNewAdvert} className='fl-btn'>SUBMIT AND MAKE PAYMENT</button>
        </div>
      </div>
    </div>
        
      
  );
}
//myRef3
export default CreateTasks;
