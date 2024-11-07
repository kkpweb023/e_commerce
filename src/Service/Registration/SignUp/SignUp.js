import React, { useEffect, useState } from 'react';
import './SignUp.css';
import axios from 'axios';

import { Link, useNavigate } from 'react-router-dom';
import sign from '../../../Images/sign.png';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;


const SignUp = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        auth ? navigate('/') : navigate('/signUp');
    }, [navigate])


    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const [errName, setErrorName] = useState('');
    const [errEmail, setErrorEmail] = useState('');
    const [errPass, setErrorPass] = useState('');



    function handleReg(){

        axios.post(`${port}/register`, {
            name: name,
            email: email,
            password: pass
        })
            .then((result) => {
                if (result.data === "Email already register") {
                    alert("Email already register")

                } else if (result.data === "Field Empty") {

                    alert("All fields are required")
                }
                else {
                    localStorage.setItem('user', JSON.stringify(result.data))
                    navigate('/')
                }
            })
            .catch((error) => console.log("! 404 failed"))
    }

    function validation() {

        if (name.trim() === "") {
            setErrorName("Name is required")

        } else if (name.length < 5) {
            setErrorName("Name atleast have 5 letters")

        } else if (!name.match(/^[" "A-Za-z]+$/)) {
            setErrorName("*Only character are allowed")
        }
        else {
            setErrorName("Successful")
        }

        if (email.trim() === "") {
            setErrorEmail("*Email is required")

        } else if (email.indexOf('@') <= 0) {
            setErrorEmail("*Invalid @ position")

        } else if (!email.match(/^[a-z0-9]+@[a-z]+\.[a-z]{2,4}$/)) {
            setErrorEmail("*Invalid email")
        }
        else {
            setErrorEmail("Successful");
        }


        if (pass.trim() === "") {
            setErrorPass("*Passward is required'")

        } else if ((pass.length < 5) || (pass.length > 15)) {
            setErrorPass("*Paasword must be 5-15 char")

        } else if (!pass.match(/[!@#$%&*()_\-+=?<>.]/)) {
            setErrorPass("*Atleast One Special Symbol are allowed")
        }
        else if (!pass.match(/[0-9]/)) {
            setErrorPass("*Password contain 0-9 number")
        }
        else if (!pass.match(/[A-Z]/)) {
            setErrorPass("*Atleast One UPPERCASE are allowed")
        } else if (!pass.match(/[a-z]/)) {
            setErrorPass("*Atleast One LOWERCASE are allowed")
        }
        else {
            setErrorPass("Successful");
            
        }
    }

    function handleSignUp(e) {
        e.preventDefault();
        validation();
        handleReg();
    }








    return (

        <section className="background-radial-gradient overflow-hidden">

            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>


                        <div className="bg-glass rounded-3 form_div d-flex" >

                            <img src={sign} alt="" style={{ width: "40%" }} />


                            <div className="card-body px-4 py-4 px-md-5">
                                <h2 className="fw-bold text-center pt-4">Sign Up</h2>

                                <form className='mt-4'>

                                    <div className="form-outline">

                                        <input type="text"
                                            id={"form3Example1"}
                                            className="form-control w-100 shadow-none"
                                            placeholder='Enter full name'
                                            value={name}
                                            required
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        {
                                            errName === "Successful"
                                                ? <small style={{ color: "green" }}>{errName}</small>
                                                : <small style={{ color: "red" }}>{errName}</small>
                                        }


                                    </div>


                                    <div className="form-outline mb-4 mt-4">
                                        <input type="email"
                                            id="form3Example3"
                                            className="form-control w-100 shadow-none"
                                            value={email}
                                            placeholder='Enter email id'
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        {
                                            errEmail === "Successful" ? <small style={{ color: "green" }}>{errEmail}</small> : <small style={{ color: "red" }}>{errEmail}</small>
                                        }

                                    </div>

                                    <div className="form-outline mb-4">

                                        <input type="password"
                                            id="form3Example4"
                                            className="form-control w-100 shadow-none"
                                            placeholder='Enter password'
                                            value={pass}
                                            onChange={(e) => setPass(e.target.value)} />
                                        {
                                            errPass === "Successful" ? <small style={{ color: "green" }}>{errPass}</small> : <small style={{ color: "red" }}>{errPass}</small>
                                        }

                                    </div>

                                    <button type="submit" className="btn btn-primary w-100 btn-block mb-4 shadow-none" onClick={handleSignUp}>
                                        Sign up
                                    </button>

                                    <p>Have already an account? <Link to={'/login'} className="link-info">Login here</Link></p>

                                </form>

                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </section>

    )
}

export default SignUp;