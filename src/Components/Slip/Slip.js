import React, { useEffect, useState } from 'react';
import './Slip.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import jsPDF from 'jspdf';
import axios from 'axios';

let port = `https://ecommerce-production-9ab4.up.railway.app/` || `http://localhost:4000`;


const Slip = ({ showSlip, handleSlipClose, slip }) => {

    const handleSlip = async () => {
        const pdf = new jsPDF('p', 'pt', 'a4');
        const data = document.querySelector("#pdf");
        pdf.html(data).then(() => {
            pdf.save("slip.pdf");
        });
    }

    //const [itemSlip, setItemSlip] = useState([]);
    const [productTable, setProductTable] = useState([]);

    
    function getPaymentSlip() {
        axios.get(`${port}/paymentlist`)
            .then((result) => {
                //setItemSlip(result.data)
                result.data.map((value) => setProductTable(value.product))
            })
            .catch((error) => console.log("! 404 data not found"));
    }
    useEffect(() => {
        getPaymentSlip()
    },[slip])
 

   
   




    return (

        <Modal show={showSlip} animation={false} >
            <Modal.Header className="modal_header">
                <Button variant="primary" download onClick={handleSlip}>
                    Download Slip
                </Button>

                <div onClick={handleSlipClose} style={{ cursor: "pointer", color: "whitesmoke", fontSize: "20px" }}><i className="bi bi-x-lg slip-cancel"></i></div>
            </Modal.Header>

            <Modal.Body className='modal_body'>
                <div className='container slip_container p-3' id={'pdf'}>

                    <h5 className='text-center mb-3'>Tax Invoice</h5>

                    <div className='company_Invoice d-flex flex-wrap justify-content-between' >

                        <div className='company_name'>
                            <div><b>Sold By</b>:Sony Private Limited</div>
                            <div><b>Shipping From</b>: A-56,Noida sector-62,Uttar Pradesh-201303</div>
                        </div>

                        <div className='Invoice_number'>
                            <b>Invoice Number:</b>{slip.invoiceNumber}
                        </div>

                        <small className='gstn_number mt-2'>
                            <b>GSTIN:</b>{slip.gstn}
                        </small>
                    </div>
                    <hr />

                    <div className='order_address d-flex  justify-content-between'>

                        <div>
                            <small><b>Order Id: {slip._id}</b></small><br />
                            <small><b>Order Date:</b>{slip.date}</small>
                        </div>


                        <div className='address'>

                            <div><b>Bill To:</b></div>

                            <div>
                                <div>{slip.nameCard}</div>
                                <div>28/A-2,mosardah mod,nasopur,Mau-275101</div>
                                <div>+91 9454631414</div>
                            </div>
                        </div>
                    </div>
                    <small>Item:{slip.item}</small>


                    <table className='table'>

                        <thead>
                            <tr>
                                <th scope="col">Product</th>
                                <th scope="col">Title</th>
                                <th scope="col">Qty</th>
                                <th scope="col">Amount</th>
                                <th scope="col">IGST</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>

                        <tbody>

                            {
                                productTable.map((value, index) =>
                                    <tr key={index}>

                                        <td>{value.brand},smartphones</td>
                                        <td>i{value.title}</td>
                                        <td>{value.quantity}</td>
                                        <td>{value.price}</td>
                                        <td>0</td>
                                        <td>{value.price}</td>

                                    </tr>
                                )}

                        </tbody>

                        <tbody className='product_table'>
                            <tr>
                                <td></td>
                                <td>Total</td>
                                <td>{slip.item}</td>
                                <td>{slip.itemtotal}</td>
                                <td>{slip.igst}</td>
                                <td>{slip.total}</td>
                            </tr>
                        </tbody>
                    </table>


                    <div className='d-flex justify-content-end'>

                        <span className='me-5'><b>Grand Total</b></span>
                        <span className='me-4'><b>Rs {slip.total}</b></span>

                    </div>

                    <div className='Signatory_table text-end'>Authorized Signatory</div>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default Slip;