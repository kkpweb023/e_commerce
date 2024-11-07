import React, { useContext, useEffect, useRef, useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import CartItems from './CartItems';
import axios from 'axios';
import Button from 'react-bootstrap/esm/Button';
import cartImg from '../../Images/Cart.png';
import { MyContext } from '../../App';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;

const Cart = () => {

    const {cartPoint} = useContext(MyContext);

    const navigate = useNavigate();

    const [cartItem, setCartItem] = useState([]);


    function cartList() {
        axios.get(`${port}/cartlist`)
            .then((result) => setCartItem(result.data))
            .catch((error) => console.log("!404 failed"));
    }

    function handleCartClose(id) {

        axios.delete(`${port}/deleteCart/${id}`)
            .then((result) => {
                result.data.deletedCount === 1
                    ? cartList() || cartPoint()
                    : alert("delete failed")
            })
            .catch((error) => console.log("! 404 failed"))
    }


    let [numItem, setNumItem] = useState("");
    console.log(numItem)
    
    function handleQuantity(id, quantity) {
        
        axios.put(`${port}/quantityUpdate/${id}`, {
            quantity: quantity,
        }).then((result) => {
            (result.data.modifiedCount === 1) 
            ? setNumItem(quantity)
            : setNumItem(1)
        })
            .catch((error) => console.log("! 404 failed"))
    }
    
    useEffect(() => {
        handleQuantity();
        cartList();
    },[cartPoint])



    let [price, setPrice] = useState([]);
    let [discount, setdiscount] = useState([]);
    let [delivery, setdelivery] = useState([]);
    let [total, setTotal] = useState([]);

    function handleCartPrice() {

        let price = 0;
        let discount = 0;
        let delivery = 0;
        let total = 0;

        cartItem.forEach(item => {

            
            price= price + item.price 
            discount = discount + item.discountPercentage
            delivery = delivery + item.deliveryCharge
            total = price + delivery - discount

        });
        setPrice(price)
        setdiscount(discount)
        setdelivery(delivery)
        setTotal(total)
    }
    const temp = useRef();
    temp.current = handleCartPrice;

    useEffect(() => {
        temp.current();
    },[cartItem])

    
   


    return (
        <div className='container'>

            <div className='row item-cart-list'>

                {cartItem.length > 0 ?

                    <>
                        <CartItems
                            cartProduct={cartItem}
                            handleCartClose={handleCartClose}
                            handleQuantity={handleQuantity} />

                        <div className='col-4 price-details p-3 h-25'>

                            <h4 className='text-secondary'>Price Details</h4>

                            <hr />

                            <div className='d-flex p-3'>
                                <input type={'text'} placeholder="promo code" className='form-control shadow-none rounded-0 h-25' />
                                <button className='btn btn-primary shadow-none rounded-0 p-2' style={{ fontSize: "12px" }}>Apply</button>
                            </div>

                            <div className='d-flex flex-column'>

                                <div className="d-flex flex-row justify-content-between p-2">
                                    <span>Price({cartItem.length} item)</span>
                                    <span>${price}</span>
                                </div>


                                <div className="d-flex flex-row justify-content-between p-2">
                                    <span>Discount</span>
                                    <span style={{ color: "green" }}>-${discount}</span>
                                </div>


                                <div className="d-flex flex-row justify-content-between p-2">
                                    <span>Delivery Charges</span>
                                    <span style={{ color: "red" }}>${delivery}</span>

                                </div>

                                <div className="d-flex flex-row justify-content-between mb-3 mt-3 p-2 total-amount">

                                    <span className='fs-5'>Total Amount</span>
                                    <span className='fs-5'>${total}</span>

                                </div>

                                <button className='btn btn-primary shadow-none rounded-1 fs-6 p-1' onClick={() => navigate('/placeOrder')}>Place Order</button>

                            </div>

                        </div>

                    </>
                    : <div className='d-flex justify-content-evenly'>
                        <span>
                            <h1>Cart Item Empty</h1>
                            <Button variant="success" className='mt-5' onClick={() => navigate('/')}>Add item</Button>
                        </span>
                        <img src={cartImg} alt="" className='w-50' />
                    </div>
                }
            </div>

        </div>
    )
}

export default Cart;