import React, { useEffect, useState } from 'react';

import './Spinner.css';

function Wheel({items, onSelectItem}){
 
  const [selectedItem, setSelectedItem] = useState(null)
  const [lastitem, setLastitem] = useState(null)
  const [spinning, setSpinning] = useState(false)
  

  const selectItem=()=>{
    setSpinning(true)
    if (selectedItem === null) {
      const selectedItem = Math.floor(Math.random() * items.length);
      if (onSelectItem) {
        onSelectItem(selectedItem);
      }

      setSelectedItem(selectedItem)
      setLastitem(selectedItem)
    } else {
      setSelectedItem(null)
      
      setTimeout(selectItem, 500);
    }
  }

  useEffect(() => {
    console.log(selectedItem, spinning)
    if (spinning) {
    
      setTimeout(() => {
        setSpinning(false)
      }, 5000);
    }
  }, [selectedItem, spinning])
  
  
    if (!spinning) {
      console.log('out: should have stop spinning')
    }

    const wheelVars = {
      '--nb-item': items.length,
      '--selected-item': selectedItem,
    };
    const spinningcss = selectedItem !== null ? 'spinning' : '';

   
    return (
      <div className='spin-div'>
        {items[lastitem] === '0' && !spinning &&
          (<div className='win-container'>
            <div className='win-container-price'>{items[selectedItem]} POINTS</div>
            <img src='/static/images/won.png' alt='' className='win-img' />
            <button className='cancel-win'>X</button>
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

        <button className='spin-button' onClick={selectItem}>SPIN</button>
      </div>
      
    );
  }


export default  Wheel
