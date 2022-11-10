import React, { useEffect, useState } from 'react';

import './Spinner.css';

function Wheel({items, onSelectItem}){
  const [selectedItem, setSelectedItem] = useState(null)
  const [lastitem, setLastitem] = useState(null)
  const [spinning, setSpinning] = useState(false)
  const [loading, setLoading] = useState(null)


  const selectItem=()=>{
    setSpinning(true)
    setLoading('rolling')
    if (selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * items.length);
      if (onSelectItem) {
        onSelectItem(selectedItem);
      }

      setSelectedItem(selectedItem)
      setLastitem(selectedItem)
    } else {
      setSelectedItem(null)
      
      //setTimeout(selectItem, 500);
    }
  }

  const setToDef=()=>{
    setSelectedItem(null)
    setLastitem(null)
    setSpinning(false)
    setLoading(null)
  }
  
  useEffect(() => {
    console.log(selectedItem, spinning)
    if(spinning) {
        setTimeout(() => {
          setSpinning(false)
          setLoading('stopped-rolling')
        }, 5000);
        return
    }
    return
  }, [selectedItem, spinning])


  useEffect(() => {
   // console.log(spinning, items[lastitem], loading)
    if (items[lastitem] !== 'NO POINTS' && !spinning && loading === 'stopped-rolling') {
      return setLoading('won')
    }
    return
  //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastitem, spinning])

    console.log('-------',selectedItem,
        lastitem,
        spinning,
        loading, '--------------')
 

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinningcss = selectedItem !== null ? 'spinning' : '';

    return (
      <div className='spin-div'>
        {loading === 'won' &&
          (<div className='win-container'>
            <div className='win-container-price'>{items[selectedItem]}</div>
            <img src='/static/images/won.png' alt='' className='win-img' />
            <button className='cancel-win' onClick={()=>setToDef()}>X</button>
        </div>)}
        <div className="wheel-container">
          <div className={`wheel ${spinningcss}`} style={wheelVars} onClick={selectItem}>
            {items.map((item, index) => (
              <div className="wheel-item" key={index} style={{ '--item-nb': index }}>
                {item}
              </div>
            ))}
          </div>
        </div>

        <button className={loading!=='rolling'?'spin-button':'spin-button-disable'} onClick={selectItem} disabled={loading !== 'rolling'?false:true}>SPIN</button>
      </div>
      
    );
  }


export default  Wheel
