import React from 'react';
import axios from 'axios';


let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;


const SavedAccount = ({handleSaveCard,data}) => {

    function handleRemove(id){

        axios.delete(`${port}/bankListDelete/${id}`)
        .then((result) =>  
                result.data.deletedCount === 1
                ? handleSaveCard()
                : alert("delete failed"))
        .catch((error) => console.log("! 404 failed"))
   
    }

 

    return (
        <div className='col save-list'>

            <h2 className='mt-4 mb-4'>Saved Account</h2>

            {
                data.map((value, index) =>

                    <div className='cart-item p-2 mb-2 save-item' key={index}>


                        <div className='mt-3 ms-5 mb-3' style={{ lineHeight: "25px" }}>

                            <div>
                                <span><b>Card:</b></span>
                                <span className='ms-3'>{value.mode}</span>
                            </div>


                            <div>
                                <span><b>Account Number:</b></span>
                                <span className='ms-3'>{value._id}</span>
                            </div>


                            <div>
                                <span><b>Name:</b></span>
                                <span className='ms-3'>{value.nameCard}</span>
                            </div>

                            <div className='d-flex justify-content-end'>

                                <button type="button"
                                    className="btn btn-outline-danger btn-sm"
                                    onClick={()=>handleRemove(value._id)}
                                >Remove Card</button>


                            </div>

                        </div>
                    </div>
                )}
        </div>
    )
}

export default SavedAccount;