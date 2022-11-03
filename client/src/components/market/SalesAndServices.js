



//import { Link } from 'react-router-dom';

import { useEffect, useState } from "react";
import { getTopUsers } from "../../reducers/actions/Auth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function SalesAndServices() {
    const [topUser, setUser]= useState([])
    useEffect(() => {
        async function d() {
            const data = await getTopUsers()
            console.log(data)
            if (data.status === true) {
                setUser(data.data)
            }
        }
        d()
    },[])
   // const auth = useSelector((state) => state.auth);
  //  const {name, currentBallance, subscription} = auth.user
//console.log(auth)
  return (
     
          
              <div className='grid-holder-back'>
                  {
                      topUser.map((e, i) => {
                          return (
                            <div key={i} className='market-items'>
                            <AccountCircleIcon className='recentActivities-img' />
                            <div className='market-items-details'>
                                      <div className='market-items'>{e.name}<br/> has a Total Earning of NGN{e.totalEarning}</div>
                            </div>
                        </div>
                        )
                    })
                  }
              </div>
        
      
  );
}
//myRef3
export default SalesAndServices;
