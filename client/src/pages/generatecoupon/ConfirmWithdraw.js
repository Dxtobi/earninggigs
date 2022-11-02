import React, { useEffect, useState } from 'react';
//import { useSelector } from 'react-redux';
import { confirmWithdraw, getAllLastTrans } from '../../reducers/actions/Auth';
//import { Link } from 'react-router-dom';


//import { Link } from 'react-router-dom'
//to={{ pathname: "https://wa.me/message/IAU7SLUDMHWQN1" }} target="_blank"
export default function ConfirmWithdraw() {
   // const auth = useSelector((state) => state.auth);
   // const {email} = auth.user
    const [request, setRequest] = useState([]);


    useEffect(() => {
        
        getAll()
    }, []);

    async function getAll() {
        const all = await getAllLastTrans()
        console.log(all)
        setRequest(all.data)
    }
    const confirmPay = async (e) => {
        const rd = await confirmWithdraw(e)
        if (rd.status) {
            getAll()
        }
   }
    return (
      <div className="page">
          <div className="page-inner">
                {
                    request.map((e, i)=>{
                        return (<div key={i} className='confirm-withdraw'>
                            <div className='price' >NGN{ e.user?.totalEarning+e.user?.currentBallance}</div>
                            <div className='account-details'>
                                <div>{e.bankAccount}</div>
                                <div>{e.bankName}</div>
                            </div>
                            <div className='price' >{e.user?.name}</div>
                            <button className='task-list-btn' onClick={()=>confirmPay(e._id)}>PAYMENT MADE</button>
                        </div>)
                    })
            }
          </div>
      </div>
  )
}
