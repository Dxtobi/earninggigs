import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateCouponFund } from '../../reducers/actions/Auth';
//import { Link } from 'react-router-dom';


//import { Link } from 'react-router-dom'
//to={{ pathname: "https://wa.me/message/IAU7SLUDMHWQN1" }} target="_blank"
export default function CouponGenerateFund() {
    const auth = useSelector((state) => state.auth);
    const {email} = auth.user
    const [coupon, setCoupon] = useState({});
    const [couponPrice, setCouponPrice] = useState('');

    useEffect(() => {
        console.log(coupon)

    }, [coupon]);

    const handleSubmit = async () => {
        const d = await generateCouponFund({coupon:couponPrice, email:email})
        setCoupon(d.data);
    }

    return (
      <div className="page">
          <div className="page-inner">
              <div className="sectionOne">
                <div className="sectionOne-text-top" style={{textAlign:'start'}}>GENERATE COUPON</div>
              </div>
            </div>
            <div className='coupon'>
                <div className='coupon-type'>₦{coupon.amount}</div>
                <div className='coupon-code'>{coupon.code}</div>
            </div>
            <div className='form-holder'>
              <div className="sectionOne-text-top" style={{fontSize: 'x-large', marginTop: 80, color:'green' }}>ENTER COUPON PRICE</div>
              <div className='input-holder'>
                    <input type={'currency'} onChange={(e) => setCouponPrice(e.target.value)}
                        placeholder="Enter Amount"
                        className='input-input'
                        value={couponPrice} />
              </div>
            <button className='auth-btn' onClick={handleSubmit}>GENERATE</button>
          </div>
      </div>
  )
}
