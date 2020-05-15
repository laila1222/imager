import React from 'react';
import LogoImage from '../../images/logo.png';
import './Logo.scss';

function Logo({classes}) {
    console.log(classes);
    return (
        <div className={classes.containerClass}>
            <img src={LogoImage} alt="logo" className={classes.logoClass}/>  
            <h1 className={classes.headlineClass}>Welcome to Imager</h1> 
        </div>
    )
}

export default Logo;
