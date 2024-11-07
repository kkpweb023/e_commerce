
import React from 'react';
import './Cart.css';

const CartItems = ({ cartProduct, handleCartClose,handleQuantity }) => {


  return (
    <div className='col d-flex flex-column item-list'>
      {
        cartProduct.map((value, index) =>

          <div className='cart-item p-2 mb-2' key={index}>

            <div className='d-flex flex-row'>
              <img src={value.thumbnail} alt="" className='col-2 img-fluid'/>
              <div className='col-6 ps-4' style={{ lineHeight: "25px" }}>
                <h5>{value.title}</h5>
                <div style={{ color: "grey", fontSize: "14px" }}>{value.brand}</div>
                <div style={{ color: "grey", fontSize: "14px" }}>Size:{value.size},{value.color}</div>
                <h5 className='price_item'>${value.price}</h5>
              </div>

              <div className='col-2 p-2'>
                Qty
                <select 
                      name='' 
                      id='' 
                      className='ms-2' 
                      onChange={(e)=>handleQuantity(value.id,e.target.value)}
                    >   
                  <option value={'1'}>1</option>
                  <option value={'2'}>2</option>
                  <option value={'3'}>3</option>
                  <option value={'4'}>4</option>
                  <option value={'5'}>5</option>
                </select>
              </div>

              <div className='col-2 d-flex justify-content-end close' onClick={() => handleCartClose(value.id)}>
                <i className="bi bi-x-circle close-i"></i>
              </div>
            </div>
          </div>
        )}
    </div>
  )
}

export default CartItems;