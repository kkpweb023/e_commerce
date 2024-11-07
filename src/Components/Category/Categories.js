import React, { useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { MyContext } from '../../App';
import AddToast from '../Products/Toast';

const Categories = () => {

    let params = useParams();
    const navigate = useNavigate();
    const {categData, handleAddCard,showA,setShowA,handleClose} = useContext(MyContext);


    return (

        <>
        <AddToast showA={showA} setShowA={setShowA} handleClose={handleClose} />
        
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb p-2">
                    <li className="breadcrumb-item"><Link to={'/'}>Home</Link></li>
                    <li className="breadcrumb-item active">Categories</li>
                    <li className="breadcrumb-item active">{params.info}</li>
                </ol>
            </nav>


            <div className='item-div'>

                {
                    categData.map((value, index) =>

                        <div id='products' className="ms-4 mt-3" key={index}>
                            <div className='card product-item me-4 mt-4' data-bs-toggle="tooltip" data-bs-placement="top" title="Click to see products details">

                                <img src={value.thumbnail} alt="" className='card-img-top' onClick={() => navigate(`/products-details/${value.id}`)} />

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
        </>
    )
}

export default Categories;