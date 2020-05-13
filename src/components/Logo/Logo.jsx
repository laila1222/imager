import React from 'react';
import LogoImage from '../../images/logotrans.png';
import './Logo.scss';

function Logo() {
    return (
        <div className="logo">
            <img src={LogoImage} alt="logo" className="logo__img"/>            
        </div>
    )
}

export default Logo;
