import React,{useEffect, useState}  from 'react';
import SideMenu from '../SideMenu';
import './Account.css'
import PaymentMode from './PaymentMode';
import SavedAccount from './SavedAccount';
import axios from 'axios';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;

const Account = () => {

  const [data, setData] = useState([]);

  function handleSaveCard(){

    axios.get(`${port}/banklist`)
        .then((result) => setData(result.data))
        .catch((error) => console.log("! 404 failed"))
  }

  useEffect(()=>{
    handleSaveCard();
  },[])


  return (
    <div className='account_div d-flex'>

      <SideMenu />
      
      <div className='Card_show_div col d-flex'>
            <PaymentMode handleSaveCard={handleSaveCard}/>

            <SavedAccount handleSaveCard={handleSaveCard} data={data}/>
      </div>
    </div>
  )
}

export default Account;