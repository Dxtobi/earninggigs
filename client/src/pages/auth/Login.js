import { useState } from 'react';
import PhoneIcon from '@mui/icons-material/Phone';
import PasswordIcon from '@mui/icons-material/Password';
import './Login.css';

import { login } from '../../reducers/actions/Auth';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../../reducers/slices/Auth';
import Loading from '../../components/fixed/Loading';
//import { register } from '../../reducers/';




function Login() {
    // const dispatch = useDispatch();
    // console.log(auth)
   
    const [pass, setPass] = useState('')
    const [phone, setPhone] = useState('')
    const [loading, setLoading] = useState(false)
    
    
    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
  


    const handleSubmit = async () => {
        setLoading(true)
        if (pass === '' || phone === '' ) {
            return setError('SOME DETAILS ARE NECESSARY')
        }
        const res = await login({pass, phone})
        if (res.status === true) {
            dispatch(setAuth(res.token))
            return navigate('/dashboard')
        } else {
            setLoading(false)
        }
        
        return setError(res.message)

    }

    if (loading) {
        return <Loading/>
    }
  return (
    <div className="page" >
          <div className='form-holder'>
              <div className="sectionOne-text-top" style={{ fontSize: 'x-large', marginTop: 80, color:'green' }}>Login</div>
              {
                  error !=='' && <small style={{color:'red'}}>{error}</small>
              }
             
              
              <div className='input-holder'>
                  <div className='input-disc'><PhoneIcon/></div>
                  <input type={'email'} onChange={(e)=>setPhone(e.target.value)} placeholder="0900000000" className='input-input' value={phone}/>
              </div>

            
              <div className='input-holder'>
                  <div className='input-disc'><PasswordIcon/></div>
                  <input type={'password'} onChange={(e)=>setPass(e.target.value)} placeholder="password" className='input-input' value={pass}/>
              </div>

             

              <button className='auth-btn' onClick={handleSubmit}>Login</button>
              <br />
              <br/>
              <div> No account yet? </div>
              <br />
              <br/>
              <Link to='/register' className='auth-btn' >REGISTER</Link>
          </div>
          
    </div>
  );
}
//myRef3
export default Login;
