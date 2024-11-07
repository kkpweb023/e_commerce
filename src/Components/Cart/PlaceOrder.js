import React, { useContext, useEffect, useRef, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import Img from '../../Images/Cart1.png';
import { MyContext } from '../../App';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;


const PlaceOrder = () => {

    const {cartPoint} = useContext(MyContext);

    const navigate = useNavigate();
    const [placeItem, setPlaceItem] = useState([]);

    function placeList() {
        axios.get(`${port}/cartlist`)
            .then((result) => setPlaceItem(result.data))
            .catch((error) => console.log("!404 failed"));
    }

    function handleClose(id) {
        axios.delete(`${port}/deleteCart/${id}`)
            .then((result) => {
                result.data.deletedCount === 1
                    ? placeList() || cartPoint()
                    : console.log("delete failed")
            })
            .catch((error) => console.log("! 404 failed"))
    }

    const tempClose = useRef();
    tempClose.current = handleClose;

    useEffect(() => {
        placeList()
        tempClose.current();
    },[cartPoint])

    let [price, setPrice] = useState([]);
    //let [discount, setdiscount] = useState([]);
    let [delivery, setdelivery] = useState([]);
    let [total, setTotal] = useState([]);


    function handlePlacePrice() {
        let price = 0;
        let discount = 0;
        let delivery = 0;
        let total = 0;

        placeItem.forEach(item => {
            discount = item.discountPercentage
            price = (price + item.price) - discount
            delivery = delivery + item.deliveryCharge
            total = price + delivery
        });
        setPrice(price)
        //setdiscount(discount)
        setdelivery(delivery)
        setTotal(total)
    }
    const temp = useRef();
    temp.current = handlePlacePrice;
    useEffect(() => {
        temp.current();
    }, [placeItem])

    function handleContinue() {
        localStorage.setItem('total', total);
        navigate('/checkOut')
    }


    return (

        <div className='container'>
            <div className='row item-cart-list'>

                {placeItem.length > 0 ?

                    <>
                        <div className='col d-flex flex-column item-list'>
                            {
                                placeItem.map((value, index) =>

                                    <div className='cart-item p-2 mb-2' key={index}>

                                        <div className='d-flex flex-row justify-content-between'>
                                            <img src={value.thumbnail} alt="" className='col-2 img-fluid' />
                                            <div className='col-6 me-5' style={{ lineHeight: "25px" }}>
                                                <h5>{value.title}</h5>
                                                <div style={{ color: "grey", fontSize: "14px" }}>{value.brand}</div>
                                                <div style={{ color: "grey", fontSize: "14px" }}>Size:{value.size},{value.color}</div>
                                                <h5>${value.price}</h5>
                                            </div>

                                            <div
                                                className='col-2 d-flex justify-content-end close'
                                                onClick={() => handleClose(value.id)}>
                                                <i className="bi bi-x-circle"></i>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>



                        <div className='col-4 price-details p-3 h-50'>

                            <h4 className='text-secondary'>Price Details</h4>
                            <hr />

                            <div className='d-flex flex-column'>

                                <div className="d-flex flex-row justify-content-between p-2">
                                    <span>Price({placeItem.length} item)</span>
                                    <span>${price}</span>
                                </div>

                                <div className="d-flex flex-row justify-content-between p-2">
                                    <span>Delivery Charges</span>
                                    <span style={{ color: "red" }}>${delivery}</span>
                                </div>

                                <div className="d-flex flex-row justify-content-between mb-3 mt-3 p-2 total-amount">
                                    <span className='fs-5'>Total Amount</span>
                                    <span className='fs-5'>${total}</span>
                                </div>

                                <button className='btn btn-primary shadow-none rounded-1 fs-6 p-1' onClick={handleContinue}>CONTINUE</button>
                            </div>
                        </div>
                    </>
                    : <div className='d-flex justify-content-evenly'>
                        <span>
                            <h1>Buy Item Empty</h1>
                            <Button variant="success" className='mt-5' onClick={() => navigate('/')}>Buy item</Button>
                        </span>
                        <img src={Img} alt="" className='w-50' />
                    </div>
                }
            </div>
        </div>
    )
}
export default PlaceOrder;