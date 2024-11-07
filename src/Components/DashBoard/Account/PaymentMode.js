import React, { useState } from 'react';
import axios from 'axios';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;

const PaymentMode = ({handleSaveCard}) => {

   const [mode,setMode] = useState('');
   const [cardName,setCardName] = useState('');
   const [cardNumber,setCardNumber] = useState('');
   const [cardDate,setcardDate] = useState('')
   const [cvv,setCvv] = useState('');

   function handleCard(){

      axios.post(`${port}/bankdetails`,{
         
            mode:mode,
            nameCard:cardName,
            cardNumber:cardNumber,
            expire:cardDate,
            cvv:cvv
      }).then((result)=>{
        handleSaveCard();
        console.log(result.data)
      })
      .catch((error)=>console.log("! 404 failed"))
   }

    



  return (
    <div className="mt-5 ms-xl-5  payment_div" >

    <form className='w-100 mb-5' >

      <h3 className="pb-3" style={{ letterSpacing: "2px"}}>Add bank account</h3>


      <div className="form-outline mb-3 ms-4">

        <h6>Choose Payment Mode</h6>

        <input type={'radio'} 
              name={'Payment Mode'} 
              value={'Credit card'} 
              id="credit_card"
              className='me-2'
              onChange={(e)=>setMode(e.target.value)}
          />
        <label htmlFor='credit_card' className='me-2'>Credit card</label>

        <input 
            type={'radio'} 
            name={'Payment Mode'} 
            value={'Debit card'} 
            id="debit_card"
            className='me-2'
            onChange={(e)=>setMode(e.target.value)}
          />
        <label htmlFor='debit_card' className='me-2'>Debit card</label>

        <input type={'radio'} 
              name={'Payment Mode'} 
              value={'PayPal'} 
              id='payPal'
              className='me-2'
              onChange={(e)=>setMode(e.target.value)}
            />
        <label htmlFor='payPal'>PayPal</label>

      </div>


      <div className="form-outline mb-3 ms-4">
        <input type="text" className="form-control form-control-sm w-75 shadow-none p-2" placeholder='Enter Name on Card' onChange={(e)=>setCardName(e.target.value)}/>

      </div>

      <div className="form-outline mb-3 ms-4">
        <input type="number" className="form-control form-control-sm w-75 shadow-none p-2" placeholder='Enter Card Number' onChange={(e)=>setCardNumber(e.target.value)}/>
      </div>
      
      <div className="form-outline mb-3 ms-4">
        <input type="text" className="form-control form-control-sm w-75 shadow-none p-2" placeholder='mm/yyyy' onChange={(e)=>setcardDate(e.target.value)}/>
      </div>


      <div className="form-outline mb-3 ms-4">
        <input type="number" className="form-control form-control-sm w-75 shadow-none p-2" placeholder='cvv' 
        onChange={(e)=>setCvv(e.target.value)}/>
      </div>

      <div className="pt-1 mb-4 ms-4">
        <button className="btn btn-info btn-sm btn-block w-75 shadow-none" type="button" onClick={handleCard}>Add</button>
      </div>

      
    </form>

  </div>
  )
}

export default PaymentMode