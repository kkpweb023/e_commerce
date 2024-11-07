import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import './Order.css';
import Paginate from './Paginate';
import ViewSlip from './ViewSlip';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;



const Order = () => {

    const [orderTable, setOrderTable] = useState([]);

    //Paginate

    const [page,setPage] = useState(1);
    const postPerPage = 6;
    const currentPage = page;
    const lastIndex = currentPage * postPerPage;
    const firstIndex = lastIndex - postPerPage;
    const PaginateTable = orderTable.slice(firstIndex,lastIndex); 


    function getPaymentSlip() {
        axios.get(`${port}/paymentlist`)
            .then((result) => {
                setOrderTable(result.data)
            })
            .catch((error) => console.log("! 404 data not found"));
    }


    function handleDelete(id) {

        axios.delete(`${port}/paymentlistDelete/${id}`)
            .then((result) => {
                if (result.data.deletedCount === 1) {
                    alert("delete successfully");
                    getPaymentSlip();
                } else {
                    alert("delete failed")
                }
            })
            .catch((errors) => console.log("! 404 failed"));
    }

    useEffect(()=>{
        getPaymentSlip();
    },[])





    const [showSlip, setShowSlip] = useState(false);
    const handleSlipClose = () => setShowSlip(false);
   
    //payment view slip download
 
    const [slip,setSlip] = useState([]);
    const [viewTable, setViewTable] = useState([]);

    function handleView(id){
        setShowSlip(true)
        axios.get(`${port}/paymentlist/${id}`)
        .then((result) => {
            result.data.map((value) => setSlip(value))
            result.data.map((value) => setViewTable(value.product))
        })
        .catch((error) => console.log("! 404 data not found"));
    }






    return (
        <>

            <div className='container order_div'>
                <h1>ORDERS</h1>
                <Table striped bordered hover className='order_table'>
                    <thead className="table-dark">
                        <tr>
                            <th>S.NO.</th>
                            <th>ORDER ID</th>
                            <th>DATE</th>
                            <th>ITEMS</th>
                            <th>AMOUNTS</th>
                            <th>STATUS</th>
                            <th>VIEW</th>
                            <th>DELETE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orderTable.length > 0 ?

                                PaginateTable.map((value, index) =>

                                    <tr key={index}>
                                        <td data-label="S.No." style={{ paddingTop: "0px"}}>{index + 1}</td>
                                        <td data-label="ORDER ID">{value._id}</td>
                                        <td data-label="DATE">{value.date}</td>
                                        <td data-label="ITEMS">{value.item}</td>
                                        <td data-label="AMOUNTS">Rs. {value.total}</td>
                                        <td data-label="STATUS">Success{value.status}</td>
                                        <td data-label="VIEW"><button type="button" className="btn btn-success shadow-none" style={{ fontSize: "10px" }} onClick={()=>handleView(value._id)}>View</button></td>

                                        <td data-label="DELETE" className='delete_short'><button type="button"
                                            className="btn btn-danger shadow-none"
                                            style={{ fontSize: "10px"}}
                                            onClick={() => handleDelete(value._id)}
                                        >Delete</button></td>
                                    </tr>
                                )
                                :
                                <tr>
                                    <td style={{ border: "none",fontSize: "40px", color: "blue", fontWeight: "bold" }} colSpan={'8'} className='no_td'>No Order Item Found</td>
                                </tr>
                        }
                    </tbody>
                </Table>
            </div>


            <Paginate setPage={setPage} page={page} PaginateTable={PaginateTable}/>

            <ViewSlip slip={slip} viewTable={viewTable} showSlip={showSlip} handleSlipClose={handleSlipClose}/>

        </>
    )
}

export default Order;