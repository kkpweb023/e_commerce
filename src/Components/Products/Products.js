import React, { useContext } from 'react';
import './Products.css';
import { useNavigate } from 'react-router-dom';
import Slider from '../../Slider/Slider';
import AddToast from './Toast';
import { MyContext } from '../../App';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const Products = () => {

    const {data, handleAddCard,handleClose,setShowA,showA} = useContext(MyContext);
    const navigate = useNavigate();

    return (
        <div className='Container mb-5'>

            <Slider />
            <AddToast showA={showA} setShowA={setShowA} handleClose={handleClose} />

            <div className='item-div'>

                {

                    data.map((value, index) =>

                        <div id='products' className="ms-4 mt-3" key={index}>
                            <div className='card product-item me-4 mt-4' data-bs-toggle="tooltip" data-bs-placement="top" title="Click to see products details">

                                <LazyLoadImage
                                   src={value.thumbnail} 
                                   alt="" loading="lazy" 
                                   className='card-img-top' 
                                   onClick={() => navigate(`/products-details/${value.id}`)} 
                                />

                                
                                <div className='card-body'>
                                    <span className='d-flex justify-content-between '>
                                        <h6 className='card-subtitle mb-2 text-muted fw-light'>{value.category}</h6>
                                        <small className='text-success'>{value.size},{value.color}</small>
                                    </span>

                                    <h5 className='card-title'>{value.title}</h5>

                                    <p className='card-text price'>${value.price}
                                        <span className='flot-end rating-stars'>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                            <i className="bi bi-star-fill"></i>
                                        </span>
                                    </p>
                                    <div className='text-center'>
                                        <button
                                            className='btn-dark w-100 rounded-2 shadow-none'
                                            onClick={() => handleAddCard(value)}

                                        >Add To Cart</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}  
            </div>
        </div>
    )
}

export default Products