import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { confirmCoupon } from '../../reducers/actions/Auth';
import { setAuth } from '../../reducers/slices/Auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/fixed/Loading';
//import { Link } from 'react-router-dom';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
//import { Link } from 'react-router-dom'
//to={{ pathname: "https://wa.me/message/IAU7SLUDMHWQN1" }} target="_blank"
export default function Subscriptions() {
    const auth = useSelector((state) => state.auth);
    const {email} = auth.user
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [coupon, setCoupon] = useState('');
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = async () => {
        setLoading(true)
        if (coupon === '' || coupon.length < 6) {
            setLoading(false)
            return setError({message:'Invalid Coupon'})
        }
        const d = await confirmCoupon({ coupon: coupon, email: email });
        
        console.log(d)
        if (d.status === true) {
           
            dispatch(setAuth(d.token))
            setLoading(false)
             navigate('/dashboard')
        } else {
            setLoading(false)
            setError({ message: 'Coupon Not Supported' })
            return
        }
        
    }
    if (loading) {
       return <Loading/>
    }
    return (
      <div className="page">
          <div className="page-inner">
              <div className="sectionOne">
                <div className="sectionOne-text-top" style={{textAlign:'start'}}>PICK A SUBSCRIPTION</div>
                <div className="sectionOne-text">
                      Subscriptions are earned via  <span className="special-text">Coupon Codes</span>  to complete a purchase
                      you would have to enter a <span className="special-text">Coupon Code </span> 
                     You purchase from one of our vendors.
                 </div>
              </div>
            </div>
            
            <div className='form-holder'>
              <div className="sectionOne-text-top" style={{ fontSize: 'x-large', marginTop: 80, color:'green' }}>ENTER COUPON</div>
              {
                error && <small style={{ color: 'red' }}>{error.message}</small>
            }
              <div className='input-holder'>
                  <input type={'email'} onChange={(e)=>setCoupon(e.target.value)} placeholder="GOKDNX23P4" className='input-input' value={coupon}/>
              </div>
            <button className='auth-btn' onClick={handleSubmit}>SUBSCRIBE</button>


            
          </div>
          <div className="page-inner-100p">
            <div className="sectionOne-text-top" style={{textAlign:'center'}}>AVAILABLE SUBSCRIPTIONS</div>
                <div className='price-comp'>
                <div className='price-type'>S I M P L E</div>
                <div className='price-amount'>₦1500</div>
                <div className='price-discretion'>
                    The return value for each task is at ₦100<br />
                    Maximum withdrawal: ₦3000<br />
                    Minimum withdrawal: ₦3000<br/>
                </div>
                <br/>
                <button onClick={handleOpen} className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</button>
                </div>
                
                <div className='price-comp'>
                <div className='price-type'>B A S I C</div>
                <div className='price-amount'>₦5000</div>
                <div className='price-discretion'>
                    The return value for each task is at ₦150<br />
                    Maximum withdrawal: ₦10000<br />
                    Minimum withdrawal: ₦8000<br/>
                </div>
                <br/>
                <button onClick={handleOpen} className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</button>
                </div>

                <div className='price-comp'>
                <div className='price-type'>G O L D</div>
                <div className='price-amount'>₦10000</div>
                <div className='price-discretion'>
                    The return value for each task is at ₦250<br />
                    Maximum withdrawal: ₦20000<br />
                    Minimum withdrawal: ₦15000<br />
                </div>
                <br/>
                <button onClick={handleOpen} className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</button>
                </div>
                
                <div className='price-comp'>
                <div className='price-type'>D I A M O N D</div>
                <div className='price-amount'>₦15000</div>
                <div className='price-discretion'>
                    The return value for each task is at ₦400<br />
                    Maximum withdrawal: ₦30000<br />
                    Minimum withdrawal: ₦20000<br/>
                </div>
                <br/>
                <button onClick={handleOpen} className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} to='/register'>SUBSCRIBE</button>
                </div>
            </div>
            
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                <br/>
                <br/>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    S I M P L E
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <a href='https://wa.me/message/IAU7SLUDMHWQN1' rel="noreferrer" target="_blank" className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} >SUBSCRIBE</a>
                    </Typography>
                    <br />
                <br />
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    B A S I C
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <a href='https://wa.me/message/IAU7SLUDMHWQN1' rel="noreferrer" target="_blank" className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} >SUBSCRIBE</a>
                </Typography>

                <br/>
                <br/>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    G O L D
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <a href='https://wa.me/message/IAU7SLUDMHWQN1' rel="noreferrer" target="_blank" className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} >SUBSCRIBE</a>
                </Typography>
                
                <br/>
                <br/>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    D I A M O N D
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <a href='https://wa.me/message/IAU7SLUDMHWQN1' rel="noreferrer" target="_blank" className='scroll-btn' style={{background:'black', width:'90%', textDecoration:'none', textAlign:'center'}} >SUBSCRIBE</a>
                </Typography>
                </Box>
            </Modal>
      </div>
  )
}
