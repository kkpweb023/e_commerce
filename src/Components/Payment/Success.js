import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Success.css';
import Img from '../../Images/suss.JPG';



const Success = ({ handleSlipShow, show, slip, pay }) => {


    return (
        <div >
            <Modal show={show} animation={false}>
                <Modal.Body>
                    <div className='success text-center'>
                        <i className="bi bi-check-circle-fill"></i>
                        <img src={Img} alt="" className='succ_img' />
                    </div>
                    <h3 className='text-center mt-3 text-success'>{pay}</h3>
                    <hr />

                    <div className='order'>
                        <div className='h5'>Order number:{slip._id}</div>

                        <div className='p-2' style={{ lineHeight: "40px", color: "grey" }}>

                            <div className='d-flex justify-content-between'>
                                <span>Total Amount Paid</span>
                                <span>${slip.total}</span>
                            </div>

                            <div className='d-flex justify-content-between'>
                                <span>Paid By</span>
                                <span>{slip.mode}</span>
                            </div>
                        </div>
                    </div>

                </Modal.Body>

                <Modal.Footer className='d-flex justify-content-around'>
                    <h6>Thank you for shopping...</h6>

                    <Button variant="primary" onClick={handleSlipShow}>
                        Payment Slip
                    </Button>

                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Success;