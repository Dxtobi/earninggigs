//getTasks

import { useState, useEffect } from 'react';



import { useSelector } from 'react-redux';
import { myReferrers } from '../../reducers/actions/Auth';
import Loading from '../../components/fixed/Loading';
import AdjustIcon from '@mui/icons-material/Adjust'
function MyReferrers() {

    //const navigate = useNavigate();
    const user = useSelector((state) => state.auth);
   
    const [referrers, setRefs] = useState(null)
    useEffect(() => {

        const getUserRef = async () => {
            const data = await myReferrers(user.user._id)
            if (data.status === true) {
                console.log('called')
                return setRefs(data.data)
            }
            console.log(data)
        }

        getUserRef()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
 
 


  if (referrers === null || referrers === undefined) {
 return <Loading/>
}
  return (
    <div className='page'>
      <div className='page-inner'>
        <div className='referral-total'>
          <div>Total Reference Earned</div>
          <h2>
            NGN{referrers.length * 500}
          </h2>
        </div>
              {
                referrers.map((e, i) => {
                      return (
                        <div className='referal-div-item' key={i}>
                            <AdjustIcon/> <div>{e.description}</div>
                          </div>
                      )
                  })
       }
      </div>
    </div>
  );
}
//myRef3
export default MyReferrers;
