import React from 'react';
import { Link } from 'react-router-dom';
import './SideMenu.css';

const SideMenu = () => {
    return (
            <div className='Side_Content_div'>

                <div className='profile'>
                    <Link to={"/myAccount/dashboard/profile"} className="a" data-bs-toggle="tooltip" data-bs-placement="top" title="profile">
                        <i className="bi bi-person-circle"></i>
                    </Link>
                </div>

                <div className='address'>
                    <Link to={"/myAccount/dashboard/address"} className="a" data-bs-toggle="tooltip" data-bs-placement="top" title="address">
                        <i className="bi bi-house-door"></i>
                    </Link>
                </div>

                <div className='account'>
                    <Link to={"/myAccount/dashboard/account"} className="a"><i className="bi bi-person-fill"></i></Link>
                </div>

                
                <div className='setting'>
                    <Link to={"/myAccount/dashboard/setting"} className="a" data-bs-toggle="tooltip" data-bs-placement="top" title="setting">
                        <i className="bi bi-gear"></i>
                    </Link>
                </div>

            </div>

    )
}

export default SideMenu