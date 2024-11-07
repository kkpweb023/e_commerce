import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './ProductDetails.css';
import ProductAccordion from './ProductAccordion';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../../App';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;


const ProductDetails = () => {

    const { cartPoint } = useContext(MyContext);

    const navigate = useNavigate();
    const auth = localStorage.getItem('user');

    const [productDetails, setProductDetails] = useState([]);
    const [images, setImages] = useState([]);
    const [changeImg, setChangeImg] = useState('');
    const params = useParams();

    const [color, setColor] = useState("");
    const [size, setSize] = useState("");



    function getSingleData() {
        axios.get(`${port}/product-details/${params.id}`)
            .then((result) => {
                setProductDetails(result.data)
                setImages(result.data.images)
                setChangeImg(result.data.thumbnail)
                setColor(result.data.color)
                setSize(result.data.size)
            })
            .catch((error) => console.log('! 404 fatech failed'))

    }

    const temp = useRef();
    temp.current = getSingleData;

    useEffect(() => {
        temp.current();
    }, [])


    function addCartList() {
        axios.post(`${port}/cartProduct`, {

            id: productDetails.id,
            title: productDetails.title,
            brand: productDetails.brand,
            size: size,
            color: color,
            quantity: "",
            price: productDetails.price,
            discountPercentage: productDetails.discountPercentage,
            deliveryCharge: productDetails.deliveryCharge,
            total_amount: productDetails.total_amount,
            thumbnail: productDetails.thumbnail,

        }).then((result) => {
            cartPoint();
            console.log(result.data)
        })
            .catch((error) => console.log("! 404 post failed"))
    }


    function handleCart() {
        auth ? addCartList() || navigate('/cart')
            : alert("please login") || navigate('/login');
    }


    function addBuyList() {
        axios.post(`${port}/cartProduct`, {

            id: productDetails.id,
            title: productDetails.title,
            brand: productDetails.brand,
            size: size,
            color: color,
            quantity: "",
            price: productDetails.price,
            discountPercentage: productDetails.discountPercentage,
            deliveryCharge: productDetails.deliveryCharge,
            total_amount: productDetails.total_amount,
            thumbnail: productDetails.thumbnail,

        }).then((result) => {
            cartPoint();
            console.log(result.data);
        })
            .catch((error) => console.log("! 404 post failed"))
    }

    function handleBuy() {
        auth
            ? addBuyList() || navigate('/placeOrder')
            : alert("please login") || navigate('/login');
    }



    return (
        <div>

            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-2">
                    <li className="breadcrumb-item">
                        <Link to={'/'}>Home</Link>
                    </li>

                    <li className="breadcrumb-item active">
                        products-details
                    </li>

                    <li className="breadcrumb-item active">
                        {productDetails.category}
                    </li>

                    <li className="breadcrumb-item active" aria-current="page">
                        {productDetails.title}
                    </li>
                </ol>
            </nav>


            <div className="container">

                <div className='row d-flex flex-row'>

                    <div className='col-md-5 product-img-big'>
                        <img src={changeImg} alt="" className='img-productDetails-fluid mt-2' style={{ height: "380px" }} />
                    </div>

                    <div className='img-zoom'>
                        <img src={changeImg} alt="" style={{ height: "82vh", width: "104%", marginLeft: "-10px" }} />
                    </div>



                    <div className='col-md-2 product-img-small d-flex flex-md-column order-md-first'>

                        {
                            images.map((value, index) =>
                                <img src={value} alt="" className='img-fluid' onMouseOver={() => setChangeImg(value)} key={index} />
                            )
                        }


                    </div>
                    <div className='col-md-5 mt-2'>

                        <h6 className='text-uppercase text-secondary'>{productDetails.brand}</h6>
                        <h2 className="fs-3">{productDetails.title}</h2>
                        <h5 className='text-secondary fs-6 fw-bold'>${productDetails.price}</h5>


                        <div style={{ fontSize: "13px" }}>

                            <div className='text-secondary'>Color:</div>

                            <div className="btn-group my-2" role="group" aria-label="Basic radio toggle button group">

                                <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autoComplete="off" />

                                <label
                                    className="btn btn-danger shadow-none color-lebel"
                                    htmlFor="btnradio1"
                                    onClick={() => setColor('red')}
                                >
                                    <i className="bi bi-check2"></i>
                                </label>


                                <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autoComplete="off" />

                                <label
                                    className="btn btn-success shadow-none color-lebel"
                                    htmlFor="btnradio2"
                                    onClick={() => setColor('green')}
                                >
                                    <i className="bi bi-check2"></i>
                                </label>


                                <input type="radio" className="btn-check" name="btnradio" id="btnradio3" autoComplete="off" />

                                <label
                                    className="btn btn-dark shadow-none color-lebel"
                                    htmlFor="btnradio3"
                                    onClick={() => setColor('black')}
                                >
                                    <i className="bi bi-check2"></i>
                                </label>

                            </div>
                        </div>



                        <div style={{ fontSize: "13px" }}>
                            <div className='text-secondary'>Size:</div>

                            <div className="btn-group my-2 w-25" role="group" aria-label="Basic radio toggle button group">

                                <input type="radio" className="btn-check" name="btnsize" id="btnradio4" autoComplete="off" />
                                <label className="btn btn-outline-dark shadow-none" htmlFor="btnradio4" style={{ padding: "2px 7px" }} onClick={() => setSize('S')}>S</label>

                                <input type="radio" className="btn-check" name="btnsize" id="btnradio5" autoComplete="off" />
                                <label className="btn btn-outline-dark  shadow-none" htmlFor="btnradio5" style={{ padding: "2px 7px" }} onClick={() => setSize('M')}>M</label>

                                <input type="radio" className="btn-check" name="btnsize" id="btnradio6" autoComplete="off" />
                                <label className="btn btn-outline-dark  shadow-none" htmlFor="btnradio6" style={{ padding: "2px 7px" }} onClick={() => setSize('L')}>L</label>
                            </div>
                        </div>


                        <div className='btn-div mt-5'>
                            <button
                                className='btn btn-dark shadow-none my-2 me-2 '
                                onClick={handleCart}
                            >
                                <i className="bi bi-cart-plus-fill"></i>
                                <span style={{ marginLeft: "8px" }}>Add to Cart</span>
                            </button>

                            <button className='btn btn-danger shadow-none my-2' onClick={handleBuy}>
                                <i className="bi bi-lightning-fill"></i>
                                <span style={{ marginLeft: "6px" }}>Buy Now</span>
                            </button>

                        </div>

                        <div className='mt-5'>

                            <span className='text-secondary fs-6'>Details:</span>

                            <ProductAccordion
                                productDetails={productDetails}
                                color={color}
                                size={size}
                            />

                        </div>

                    </div>

                </div>
            </div>

        </div>
    )
}

export default ProductDetails;