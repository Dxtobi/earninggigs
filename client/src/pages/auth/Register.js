import { useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import PasswordIcon from '@mui/icons-material/Password';
import './Login.css';

import { register } from '../../reducers/actions/Auth';
import { Link, useNavigate } from 'react-router-dom';
//import { register } from '../../reducers/';
import Loading from '../../components/fixed/Loading';



function Register() {
    // const dispatch = useDispatch();
    // console.log(auth)
    const [name, setName] = useState('')
    const [pass, setPass] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [ref, setRef] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

  


    const handleSubmit = async () => {
        if (name === '' || pass === '' || email === '' || phone === '') {
            return setError('SOME DETAILS ARE NECESSARY')
        }
        setLoading(true)
        const res = await register({name, pass, email, phone, ref})
        if (res.status) {
           return navigate('/login')
        }
        setLoading(false)
        return setError(res.message)
    }

    if(loading){
       return <Loading/>
    }
  return (
    <div className="page" >
          <div className='form-holder'>
              <div className="sectionOne-text-top" style={{ fontSize: 'x-large', marginTop: 80, color:'green' }}>REGISTER</div>
              {
                  error !=='' && <small style={{color:'red'}}>{error}</small>
              }
              <div className='input-holder'>
                  <div className='input-disc'><PersonIcon/></div>
                  <input type={'text'} onChange={(e)=>setName(e.target.value)} placeholder="John Wick" className='input-input' value={name}/>
              </div>
              
              <div className='input-holder'>
                  <div className='input-disc'><EmailIcon/></div>
                  <input type={'email'} onChange={(e)=>setEmail(e.target.value)} placeholder="example@domain.com" className='input-input' value={email}/>
              </div>

              <div className='input-holder'>
                  <div className='input-disc'><PhoneIcon/></div>
                  <input type={'tel'} onChange={(e)=>setPhone(e.target.value)} placeholder="phone" className='input-input' value={phone}/>
              </div>

              <div className='input-holder'>
                  <div className='input-disc'><PasswordIcon/></div>
                  <input type={'password'} onChange={(e)=>setPass(e.target.value)} placeholder="password" className='input-input' value={pass}/>
              </div>

              <div className='input-holder'>
                  <div className='input-disc'>Ref</div>
                  <input type={'text'} onChange={(e)=>setRef(e.target.value)} placeholder="reference (optional)" className='input-input' value={ref}/>
              </div>

              <button className='auth-btn' onClick={handleSubmit}>REGISTER</button>
              <br />
              <br/>
              <div> Already Have An Account? </div>
              <br />
              <br/>
              <Link to='/login' className='auth-btn' >Login</Link>
          </div>
          
    </div>
  );
}
//myRef3
export default Register;
