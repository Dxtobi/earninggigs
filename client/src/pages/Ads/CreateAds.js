/******
 * category
location
price
description
images
contactLink
 */

import { useState, useEffect } from 'react';

import './ads.css';

import { login } from '../../reducers/actions/Auth';
import {useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
//import { setAuth } from '../../reducers/slices/Auth';
//import { register } from '../../reducers/';




function CreateAds() {
    // const dispatch = useDispatch();
    // console.log(auth)
    const [price, set_price] = useState('')
    const [description, set_description] = useState('')
    const [name, set_name] = useState('')
    const [images, set_images] = useState([])
    const [contactLink, set_contactLink] = useState('')
    const [category, set_category] = useState('')
    const [location, set_location] = useState('')

    const [error, setError] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()


    useEffect(() => {
       // images.map(e=>console.log(e.FileList))
    console.log(images)
    }, [images])
    

    const handleSubmit = async () => {
        const formObj = FormData()
        if (price === '' || description === '' || contactLink === '' || images.length < 1 || category === '' || location === '' ) {
            return setError('SOME DETAILS ARE NECESSARY')
        }
        for (let index = 0; index < images.length; index++) {
            formObj.append('images', images[index])
        }
        const data = {
            price,
            description,
            images,
            contactLink,
            category,
            location,
        }
        const res = await login(data)
        if (res.status) {
            dispatch()
            return navigate('/dashboard')
        }
        return setError(res.message)
    }

    const onImageChange = (e) => {
        let imgs = []
        for (let index = 0; index <  e.target.files.length; index++) {
        
        imgs.push(e.target.files[index])
        }
        if(imgs.length > 0){
            set_images(imgs)
        }
       
    }


  return (
    <div className="page" >
          <div className='form-holder'>
              <div className="sectionOne-text-top" style={{ fontSize: 'x-large', marginTop: 80, color:'green' }}>CREATE ADS</div>
              {
                  error !=='' && <small style={{color:'red'}}>{error}</small>
              }
              <div className='input-holder'>
                  <input type={'text'} onChange={(e)=>set_name(e.target.value)} placeholder="Name: Air Jordan" className='input-input' value={name}/>
              </div>
              <div className='input-holder'>
                  <input type={'text'} onChange={(e)=>set_category(e.target.value)} placeholder="Category: Electronics" className='input-input' value={category}/>
              </div>
              <div className='input-holder'>
                  <input type={'text'} onChange={(e)=>set_location(e.target.value)} placeholder="Location: Ikeja Lagos" className='input-input' value={location}/>
              </div>
              <div className='input-holder'>
                  <textarea onChange={(e)=>set_description(e.target.value)} placeholder="Description: sell your market" className='input-input' value={description}/>
              </div>
              <div className='input-holder'>
                  <input type={'text'} onChange={(e)=>set_contactLink(e.target.value)} placeholder="Contact: Whatsapp Link" className='input-input' value={contactLink}/>
              </div>
              <div className='input-holder'>
                  <input type={'email'} onChange={(e)=>set_price(e.target.value)} placeholder="Price: 10000" className='input-input' value={price}/>
              </div>
              <input type={'file'} onChange={onImageChange} multiple/>
              <button className='auth-btn' onClick={handleSubmit}>Submit</button>
          </div>
    </div>
  );
}
//myRef3
export default CreateAds;
