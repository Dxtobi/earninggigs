import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { confirmCouponFund } from '../../reducers/actions/Auth';
import { setAuth } from '../../reducers/slices/Auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import Loading from '../../components/fixed/Loading';


export default function SubscriptionsFund() {
    const auth = useSelector((state) => state.auth);
    const {email} = auth.user
    const [error, setError] = useState(null);
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()


  const handleSubmit = async () => {
    setLoading(true)
    if (coupon === '' || coupon.length < 6) {
      setLoading(false)
            return setError({message:'Invalid Coupon'})
        }
        const d = await confirmCouponFund({ coupon: coupon, email: email });
        if (d.status === true) {
          setLoading(false)
            dispatch(setAuth(d.token))
            navigate('/dashboard')
            return
        } else {
          setLoading(false)
            setError({ message: 'Coupon Not Supported' })
            return
        }
  }
    if (loading) {
      return <Loading/>
  }
    return (
      <div className="page">
          <div className="page-inner">
              <div className="sectionOne">
                <div className="sectionOne-text-top" style={{textAlign:'start'}}>ENTER COUPON</div>
                <div className="sectionOne-text">
                      Enter Purchase <span className="special-text">Coupon</span> to complete Transaction.
                 </div>
              </div>
            </div>
            
            <div className='form-holder'>
              <div className="sectionOne-text-top" style={{ fontSize: 'x-large', marginTop: 80, color:'green' }}>ENTER COUPON</div>
              {
                error && <small style={{ color: 'red' }}>{error.message}</small>
            }
              <div className='input-holder'>
                  <input type={'email'} onChange={(e)=>setCoupon(e.target.value)} placeholder="GOKDNX23P4" className='input-input' value={coupon}/>
              </div>
            <button className='auth-btn' onClick={handleSubmit}>FUND</button>


            
          </div>
          <div className="page-inner-100p">
            <div className="sectionOne-text-top" style={{textAlign:'center'}}>PURCHASE COUPON </div>
                <div className='price-comp'>
                <a  href='https://wa.me/message/QXCFQ24PD7BTD1'
                    rel="noreferrer" target="_blank"
                    className='scroll-btn'
                    style={{ background: 'black', width: '90%', textDecoration: 'none', textAlign: 'center' }}>PURCHASE</a>
                </div>
            </div>
      </div>
  )
}
