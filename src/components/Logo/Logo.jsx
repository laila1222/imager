import React, { Component } from 'react'
import LogoImage from "../../images/logo.png";
import { withRouter } from 'react-router-dom';
import "./Logo.scss";



class Logo extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    redirect = () => {
        this.props.history.push('/');
    }
    

    render() {
        return (
            <div className="logo__container">
            <img src={LogoImage} alt="logo" className="logo__img" onClick={this.redirect}/>
     
         
            <h2 className="logo__brand" onClick={this.redirect}>Imager</h2>
    
        </div>
        )
    }
}

export default  withRouter(Logo)

