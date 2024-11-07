import React, {useState } from 'react';
import './ShipAddress.css';

const ShipAddress = () => {

    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [phone,setPhone] = useState('');



        console.log(name)
        console.log(address)
        console.log(phone)
    






    return (

        <div className='col-md-5 col-lg-6 p-3 payment position-relative' style={{border:"1px solid white"}}>

            <div className='edit_icon'> 
                <i className="bi bi-pencil-square" ></i>
            </div>

            <h4 className='md-4'>Shipping address</h4>
            

            <div className='card-add' style={{ lineHeight: "25px" }}>

                <div className='card-body'>

                    <h5 className='card-title text-secondary'>Kaushal KIshor Pandey</h5>

                    <input type={'text'} onChange={(e)=>setName(e.target.value)}/>



                    <h6 className='card-subtitle mb-2 text-muted'>28/A-2,Mushardah mod,Bhiti Mau-275101</h6>

                    <input type={'text'} onChange={(e)=>setAddress(e.target.value)}/>


                    <h6 className='card-text'>+91 9454631414{phone}</h6>

                    <input type={'text'} onChange={(e)=>setPhone(e.target.value)} />


                </div>


            </div>
        </div>
    )
}

export default ShipAddress