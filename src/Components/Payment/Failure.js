import React from 'react';
import Modal from 'react-bootstrap/Modal';
import './Success.css';
import Img from '../../Images/fail.JPG';
import {useNavigate} from 'react-router-dom';


const Failure = ({ handleClose, show, slip, pay }) => {

    const navigate = useNavigate();

    return (
        <div>
            <Modal show={show} animation={false}>
                <Modal.Header closeButton onClick={handleClose}></Modal.Header>

                <Modal.Body>
                    <div className='failure text-center'>
                        <img src={Img} alt="" className='succ_img' />
                    </div>
                    <h3 className='text-center mt-3 text-danger' style={{ marginBottom: "40px" }}>{pay}</h3>

                    <div className='order'>
                        <div className='h5 md-5'>Order number:{slip._id}</div>

                        <div className='fs-5 text-center' style={{ lineHeight: "40px", color: "grey", letterSpacing: "3px", paddingBottom: "40px" }}>

                            Payment failed,please pay again
                        </div>

                        <button type="button" 
                                className="btn btn-info btn-sm" 
                                style={{position:"relative",left:"60%"}}
                                onClick={()=>navigate('/myAccount/dashboard/account')}
                        >Add Payment Card</button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}
export default Failure;