import React from 'react';
import Accordion from 'react-bootstrap/Accordion';



const ProductAccordion = ({productDetails,color,size}) => {
  return (
    <Accordion className='mt-1' flush >
      <Accordion.Item eventKey="0">
        <Accordion.Header>Features</Accordion.Header>
        <Accordion.Body>
          <div>
            <span>Model Name</span>
            <span>{productDetails.title}</span>
          </div>

          <div>
            <span>Size</span>
            <span>{size}</span>
          </div>

          <div>
            <span>Color</span>
            <span>{color}</span>
          </div>

          <div>
            <span>Inline Remote</span>
            <span>{productDetails.inline_remote}</span>
          </div>

          <div>
            <span>Impedance</span>
            <span>{productDetails.impedance}</span>
          </div>


        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="1">
        <Accordion.Header>Warranty</Accordion.Header>
        <Accordion.Body>
          <div>
            <span>Domestic Warranty</span>
            <span>{productDetails.DomesticWarranty}</span>
          </div>
          <div>
            <span> Warranty Summary</span>
            <span>{productDetails.WarrantySummary}</span>
          </div>
          <div>
            <span>Covered in Warranty</span>
            <span style={{marginLeft:"110px"}}>{productDetails.CoveredInWarranty}</span>
          </div>

        </Accordion.Body>
      </Accordion.Item>


      <Accordion.Item eventKey="2">
        <Accordion.Header>Description</Accordion.Header>
        <Accordion.Body>
          {productDetails.description}
        </Accordion.Body>
      </Accordion.Item>


    </Accordion>


  )
}

export default ProductAccordion;