

import {useEffect, useState} from 'react'
//import { useSelector } from 'react-redux';
//import { Link } from 'react-router-dom';

import { getActivities } from "../../reducers/actions/Auth";


const pics = './static/images/ann.jfif'
function RecentActivities() {
 //const auth = useSelector((state) => state.auth);
  // const {name, currentBallance, subscription} = auth.user
    const [dataArr, setDataArr] = useState([])

    useEffect(() => {
        
        async function d(){
            const r = await getActivities()
            if (r.status) {
                setDataArr(r.data)
                console.log(r)
            }
        }

        d()

       // console.log(d)
    },[])
    

  return (
     
          
              <div className='grid-holder'>
                  {
                    dataArr.map((e, i) => {
                          return (
                            <div key={i} className='recentActivities'>
                            <img src={pics} alt='' className='recentActivities-img' />
                            <div className='recentActivities-text'>
                                {e.description}
                            </div>
                        </div>
                        )
                    })
                  }
              </div>
        
      
  );
}
//myRef3
export default RecentActivities;
