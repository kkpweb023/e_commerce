import React from 'react';
import './Slider.css';
import Carousel from 'react-bootstrap/Carousel';
import S1 from '../Images/S1.jpg';
import S2 from '../Images/S2.jpg';
import S3 from '../Images/S3.jpg';
import S4 from '../Images/S4.jpg';
import S5 from '../Images/S5.jpg';
import S6 from '../Images/S6.jpg';

const Slider = () => {
    return (
        <div className='Slider'>

            <Carousel>
                <Carousel.Item className='slide-image'>
                    <img
                        className="d-block w-100"
                        src={S1}
                        alt="First slide"
                    />
                    <Carousel.Caption>
                        <h3>First slide label</h3>
                        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='slide-image'>
                    <img
                        className="d-block w-100"
                        src={S2}
                        alt="Second slide"
                    />

                    <Carousel.Caption>
                        <h3>Second slide label</h3>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item className='slide-image'>
                    <img
                        className="d-block w-100"
                        src={S3}
                        alt="Third slide"
                    />

                    <Carousel.Caption>
                        <h3>Third slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>


                <Carousel.Item className='slide-image'>
                    <img
                        className="d-block w-100"
                        src={S4}
                        alt="Fourth slide"
                    />

                    <Carousel.Caption>
                        <h3>Fourth slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>



                <Carousel.Item className='slide-image'>
                    <img
                        className="d-block w-100"
                        src={S5}
                        alt="Fifth slide"
                    />

                    <Carousel.Caption>
                        <h3>Fifth slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>


                <Carousel.Item className='slide-image'>
                    <img
                        className="d-block w-100"
                        src={S6}
                        alt="Sixth slide"
                    />

                    <Carousel.Caption>
                        <h3>Sixth slide label</h3>
                        <p>
                            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                        </p>
                    </Carousel.Caption>
                </Carousel.Item>

                
            </Carousel>





        </div>
    )
}

export default Slider