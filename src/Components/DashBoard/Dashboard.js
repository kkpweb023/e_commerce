import React from 'react';
import './Dashboard.css';
import { Link } from 'react-router-dom';

const Dashboard = () => {

    return (
            <div className='Content_div'>

                <div className='profile' style={{border:"1px solid white"}}>
                    <Link to={"profile"} className="a"><i className="bi bi-person-circle"></i> Profile</Link>
                </div>

                <div className='address' style={{border:"1px solid white"}}>
                    <Link to={"address"} className="a"><i className="bi bi-house-door"></i> Address</Link>
                </div>

                <div className='account' style={{border:"1px solid white"}}>
                    <Link to={"account"} className="a"><i className="bi bi-person-fill"></i> Account</Link>
                </div>

                <div className='setting' style={{border:"1px solid white"}}>
                    <Link to={"setting"} className="a"><i className="bi bi-gear"></i>setting</Link>
                </div>
                
            </div>
    )
}
export default Dashboard; 