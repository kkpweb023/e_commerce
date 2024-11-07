import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Failure from '../Payment/Failure';

import Success from '../Payment/Success';
import Slip from '../Slip/Slip';
import './CheckOut.css';
import ShipAddress from './Shipping/ShipAddress';
import {useNavigate} from 'react-router-dom';


let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;

const Checkout = () => {

    const navigate = useNavigate();

    const [checkItem, setCheckItem] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
   
    //payment slip download

    const [showSlip, setShowSlip] = useState(false);
    const handleSlipClose = () => setShowSlip(false);
    
    const handleSlipShow = () => {
        setShow(false)
        setShowSlip(true);
    }

    let Itemtotal = localStorage.getItem('total');
    let [promoCode, setPromoCode] = useState('');
    let PaymentAmount = Itemtotal - promoCode;

    function checkOutList() {
        axios.get(`${port}/cartlist`)
            .then((result) =>{
                setCheckItem(result.data)
                setPromoCode(Math.floor(Math.random()*10))
            })
            .catch((error) => console.log("!404 failed"));
    }
    useEffect(() => {
        checkOutList()
    }, [])

    const [mode, setMode] = useState('');
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');
    const [expire, setExpire] = useState('');
    const [cvv, setCvv] = useState('');
    const [pay, setPay] = useState([]);
    const [slip, setSlip] = useState([]);


     //date set
     const date = new Date();
     let day = date.getDate();
     let month = date.getMonth() + 1;
     let year = date.getFullYear();
     let currentDate = `${day}-${month}-${year}`;

     
   

    const handleShow = () => {

        if(mode==="" || name==="" || number==="" || expire==="" || cvv===""){
            alert("Add Payment Card or enter correct data")
            navigate('/myAccount/dashboard/account')
        }else{

            axios.post(`${port}/bankCheck`, {
                mode: mode,
                nameCard: name,
                cardNumber: number,
                expire: expire,
                cvv: cvv,
                total: Itemtotal
            }).then((result) => {
                setShow(true);
                setPay(result.data);
            })
                .catch((error) => console.log("!404 failed"))
    
                
            axios.post(`${port}/payment`, {
    
                invoiceNumber:Math.floor(Math.random() * 10000000000000),
                gstn:Math.random().toString(36).substring(2,15).toUpperCase(),
                mode: mode,
                nameCard: name,
                itemtotal:Itemtotal,
                total: PaymentAmount,
                item:checkItem.length,
                address: "",
                status:"",
                date:currentDate,
                igst:promoCode,
                product:checkItem
                    
            }).then((result) => {
                setSlip(result.data);
            })
            .catch((error) => console.log("!404 failed"))

        }        

    }




    return (
        <>
            <div className="container">

                <div className="py-2 text-center">
                    <h2>Checkout </h2>
                </div>

                <div className='row mt-5'>

                    <div className="col-lg-4 order-md-last bill_payment" style={{border:"1px solid white"}}>

                        <h4 className="d-flex justify-content-between align-items-center mb-3">
                            <span className="text-primary">Your cart</span>
                            <span className="badge bg-primary rounded-pill">{checkItem.length}</span>
                        </h4>
                        <ul className="list-group mb-3">
                            <li className="list-group-item d-flex justify-content-between lh-sm">
                                <div>
                                    <h6 className="my-0">Total </h6>
                                    <small className="text-muted">Cart Items</small>
                                </div>
                                <span className="text-muted">${Itemtotal}</span>
                            </li>

                            <li className="list-group-item d-flex justify-content-between bg-light">
                                <div className="text-success">
                                    <h6 className="my-0">Promo code</h6>
                                    <small>EXAMPLECODE</small>
                                </div>
                                <span className="text-success">-${promoCode}</span>
                            </li>
                            <li className="list-group-item d-flex justify-content-between">
                                <span>Total (USD)</span>
                                <strong>${PaymentAmount}</strong>
                            </li>
                        </ul>

                    </div>

                    <ShipAddress />

                    <div className='col-md-5 col-lg-6 p-3 mt-3 payment' style={{border:"1px solid white"}}>

                        <h4 className="mb-3">Payment</h4>

                        <div className="my-3">
                            <div className="form-check">
                                <input id="credit"
                                    name="paymentMethod"
                                    type="radio"
                                    value={'Credit card'}
                                    className="form-check-input"
                                    required=""
                                    onClick={(e) => setMode(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="credit">Credit card</label>
                            </div>

                            <div className="form-check">
                                <input id="debit"
                                    name="paymentMethod"
                                    type="radio"
                                    value={'Debit card'}
                                    className="form-check-input"
                                    required=""
                                    onClick={(e) => setMode(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="debit">Debit card</label>
                            </div>

                            <div className="form-check">
                                <input id="paypal"
                                    name="paymentMethod"
                                    type="radio"
                                    value={'PayPal'}
                                    className="form-check-input"
                                    required=""
                                    onChange={(e) => setMode(e.target.value)}
                                />
                                <label className="form-check-label" htmlFor="paypal">PayPal</label>
                            </div>
                        </div>

                        <div className="row gy-3">
                            <div className="col-md-6">
                                <label htmlFor="cc-name" className="form-label">Name on card</label>

                                <input type="text"
                                    className="form-control w-100"
                                    id="cc-name"
                                    placeholder=""
                                    required=""
                                    onChange={(e) => setName(e.target.value)}
                                />
                                <small className="text-muted">Full name as displayed on card</small>
                                <div className="invalid-feedback">
                                    Name on card is required
                                </div>
                            </div>

                            <div className="col-md-6">
                                <label htmlFor="cc-number" className="form-label">Card number</label>

                                <input type="text"
                                    className="form-control w-100"
                                    id="cc-number"
                                    placeholder=""
                                    required=""
                                    onChange={(e) => setNumber(e.target.value)}
                                />
                                <div className="invalid-feedback">
                                    Credit/Debit card number is required
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-expiration" className="form-label">Expiration</label>

                                <input type="text"
                                    className="form-control w-100"
                                    id="cc-expiration"
                                    placeholder=""
                                    required=""
                                    onChange={(e) => setExpire(e.target.value)}
                                />
                                <div className="invalid-feedback">
                                    Expiration date required
                                </div>
                            </div>

                            <div className="col-md-3">
                                <label htmlFor="cc-cvv" className="form-label ms-5">CVV</label>

                                <input type="text"
                                    className="form-control ms-5"
                                    id="cc-cvv"
                                    placeholder=""
                                    required=""
                                    onChange={(e) => setCvv(e.target.value)}
                                />
                                <div className="invalid-feedback">
                                    Security code required
                                </div>
                            </div>
                        </div>

                        <hr className="my-4" />

                        <button
                            className="w-100 btn btn-primary btn-lg"
                            type="submit"
                            onClick={handleShow}>Payment Now</button>
                        {
                            pay === "Payment successful"
                                ? <Success show={show} slip={slip} pay={pay} handleSlipShow={handleSlipShow} />
                                : <Failure show={show} handleClose={handleClose} slip={slip} pay={pay} />
                        }
                    </div>
                </div>
            </div>
            
            <Slip showSlip={showSlip} handleSlipClose={handleSlipClose} slip={slip} />
           
        </>

    )
}
export default Checkout;