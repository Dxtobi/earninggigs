


import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


function FundAccounts({showFundMenu}) {
 
    const auth = useSelector((state) => state.auth);
  //  const {name, currentBallance, subscription} = auth.user
console.log(auth)
  return (
     
          
      <div className='menu-div'>
          
          <button className='menu-btn' onClick={() => showFundMenu(false)}>CLOSE</button>
          
          <Link to='/fund-account' className='menu-link'>Fund With Voucher</Link>
          
      </div>
      
        
      
  );
}
//myRef3
export default FundAccounts;
