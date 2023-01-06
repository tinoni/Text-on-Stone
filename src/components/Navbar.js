import React from 'react';
import './Navbar.css';

const Navbar = (props) => {

    return (
        <>
        <div className="navbar--extraMarginTop"></div>
        <nav className="navbar navbar-dark bg-dark fixed-top p-2 shadow mb-0">
            <div className="container-fluid">
                <span className="navbar-brand col-sm-3 col-md-2 mr-0">
                    <img src="favicon.svg" alt="Home" width="24" height="24" className="d-inline-block align-text-top"/>
                    <span className="ms-2 navbar-brand-title">Text on Stone NFT Collection</span>
                </span>

                <div className="d-flex">
                    { props.account
                        ?<small className="text-white navbar-account"><span id="account">{props.account}</span></small>
                        :<button onClick={props.onConnect} className="btn btn-secondary btn-sm">Connect your wallet</button>
                    }
                </div>
            </div>
        </nav>
        </>
    );
}

export default Navbar;
