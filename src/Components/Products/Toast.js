import React from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

function AddToast({showA,handleClose}) {

 
  return (
    <Row>
      <Col md={6}  style={{position:"fixed",bottom:"0",zIndex:"99"}}>

        <Toast show={showA}>
            <Toast.Body className='d-flex  justify-content-between' style={{backgroundColor:"green",color:"white",borderRadius:"5px",padding:"8px"}} >

                <span>Woohoo, Item successfully add to cart!</span> 
                <span onClick={handleClose}><i className="bi bi-x-lg" style={{cursor:"pointer"}}></i></span>

            </Toast.Body>
        </Toast>
        
      </Col>
    </Row>
  );
}

export default AddToast;