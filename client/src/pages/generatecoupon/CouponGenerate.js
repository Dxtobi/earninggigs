import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { generateCoupon } from '../../reducers/actions/Auth';
//import { Link } from 'react-router-dom';


//import { Link } from 'react-router-dom'
//to={{ pathname: "https://wa.me/message/IAU7SLUDMHWQN1" }} target="_blank"
export default function CouponGenerate() {
    const auth = useSelector((state) => state.auth);
    const {email} = auth.user
    const [coupon, setCoupon] = useState({});
    const [code, setCode] = useState('');

    useEffect(() => {
        console.log(coupon)

    }, [coupon]);

    const handleSubmit = async () => {
        const d = await generateCoupon({coupon:code, email:email})
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
              <div className="sectionOne-text-top" style={{ fontSize: 'x-large', marginTop: 80, color:'green' }}>ENTER COUPON PRICE</div>
              <div className='input-holder'>
            <select onChange={(e) => setCode(e.target.value)} placeholder="" className='input-input' value={code}>
              
              <option value=''>-----</option>
              
              <option value='1500'>₦1500</option>
              <option value='5000'>₦5000</option>
                        <option value='10000'>₦10000</option>

                        <option value='15000'>₦15000</option>

                </select>

              </div>

            <button className='auth-btn' onClick={handleSubmit}>GENERATE</button>

          </div>
      </div>
  )
}
