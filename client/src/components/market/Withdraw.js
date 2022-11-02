


import { useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';

import { useState } from "react";
import { withdraw } from "../../reducers/actions/Auth";


function Withdraw({showWithdrawMenu}) {
    const [bankName, setBn] = useState('')
    const [bankAccount, setBankAccount] = useState('')
    const [accountName, setAccountName] = useState('')
    const auth = useSelector((state) => state.auth);
    const { _id } = auth.user

    const handleSubmit = async () => {
        const data = {
            bankName: bankName,
            bankAccount: bankAccount,
            accountName: accountName,
            user:_id
        }
        console.log(data)

        const d = await withdraw(data)
        console.log(d)
        if (d.status) {
            showWithdrawMenu(false)
        }
    }


  return (
      <div className="menu-float">
          <div className='page'>
              <div className='page-inner'>
                  <h3 style={{textAlign:'center'}}>Account Name<br/> should Be Same As Registered Name</h3>
            <div className="form-holder">
                 <div className='input-holder'>
                    <input type={'email'} onChange={(e)=>setBn(e.target.value)} placeholder="BANK NAME" className='input-input' value={bankName}/>
                 </div>
                 <div className='input-holder'>
                     <input type={'email'} onChange={(e)=>setBankAccount(e.target.value)} placeholder="ACCOUNT NUMBER" className='input-input' value={bankAccount}/>
                 </div>
                    </div>
                    <div className='input-holder'>
                       <input type={'email'} onChange={(e)=>setAccountName(e.target.value)} placeholder="ACCOUNT NAME" className='input-input' value={accountName}/>
                    </div>
                   </div>
          <button className='auth-btn' onClick={handleSubmit}>WITHDRAW</button>
              <br />
              <br/>
          <button className='auth-btn' onClick={()=>showWithdrawMenu(false)}>CLOSE</button>
    </div>
    </div>
  );
}
//myRef3
export default Withdraw;
