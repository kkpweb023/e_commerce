import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

let port = `https://ecommerce-production-9ab4.up.railway.app` || `http://localhost:4000`;


const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    auth ? navigate('/') : navigate('/login');
  }, [navigate])


  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');


  function handleLogin() {

    axios.post(`${port}/login`, {
      email: email,
      password: pass
    })
      .then((result) => {

        if (result.data === "Please enter correct email and password") {
          alert("Please enter correct email and password")
        } else if (result.data === "Please signup") {
          alert("Please signup")
        } else {
          localStorage.setItem('user', JSON.stringify(result.data))
          navigate('/');
        }
        })
           .catch ((error) => console.log("! 404 failed login"))
    }




return (
  <section>
    <div className="mycontainer container-fluid py-5">

      <div className="row d-flex align-items-center justify-content-center">

        <div className="col-sm-6 d-none d-sm-block">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid w-75 ms-5" alt="" />
        </div>

        <div className="col-sm-6  text-black">

          <div className="d-flex align-items-center h-custom-2 ms-xl-4 pt-5 pt-xl-0 mt-xl-n5" >

            <form className='w-100 mb-5' >

              <h3 className="fw-normal mb-3 pb-3" style={{ letterSpacing: "2px" }}>Log in</h3>

              <div className="form-outline mb-5">
                <input type="email" className="form-control form-control-sm w-75 shadow-none p-2" placeholder='Enter email id' value={email} onChange={(e) => setEmail(e.target.value)} />

              </div>

              <div className="form-outline mb-5">
                <input type="password" className="form-control form-control-sm w-75 shadow-none p-2" placeholder='Enter password' value={pass} onChange={(e) => setPass(e.target.value)} />
              </div>

              <div className="pt-1 mb-4">
                <button className="btn btn-info btn-sm btn-block w-75 shadow-none" type="button" onClick={handleLogin}>Login</button>
              </div>

              <p className="small mb-2 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
              <p>Don't have an account? <Link to={'/signup'} className="link-info">Register here</Link></p>

            </form>

          </div>

        </div>

      </div>
    </div>
  </section>
)
}
export default Login;