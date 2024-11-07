import React, { useContext } from 'react';
import { MyContext } from '../../../App';
import SideMenu from '../SideMenu';
import './Setting.css';

const Setting = () => {

    const {handleMode} = useContext(MyContext);

  
    return (
        <div className='setting_div d-flex'>
            <SideMenu />

            <div className='container'>

                <div className='p-3 mb-2 dark_mode d-flex justify-content-between'>

                    <span><i className="bi bi-moon fs-5"></i> Dark Mode</span>

                    <div className='toggle' onChange={handleMode}>
                        <label className="switch">
                            <input type="checkbox"/>
                            <span className={`slider round`}></span>
                        </label>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default Setting;