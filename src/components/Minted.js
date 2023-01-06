import React from 'react';
import Timestamp from 'react-timestamp';
import './Minted.css';

const Minted = (props) => {

    return (
        <div className="card mb-3 text-bg-dark card--extraMarginTop">
            <div className="card-header"><h3>Recently Minted NFTs</h3></div>
            <div className="card-body">
                <div className="row">
                    { props.nfts.map((nft, key) => {
                        let text = nft.text.replace(/\^/g, ' ');
                        return(
                            <div key={key} className="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xm-6 mb-4">
                            <a href={nft.url} target='_blank' rel='noreferrer'>
                            <div key={key} className="card bg-dark text-white card-minted">
                                <div className="img-hover-zoom rounded">
                                    <img className="card-img" src={nft.image} alt={text} title={text}/>
                                </div>
                                <div className="card-img-overlay minted-caption">
                                    <p className="card-title minted-title">{nft.tokenId}: {text}</p>
                                    <p className="card-text minted-text">Minted <Timestamp relative date={nft.timestamp} autoUpdate /></p>
                                </div>
                            </div>
                            </a>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );

}

export default Minted;


// <img className="w-100 shadow-1-strong rounded mb-4 main-minted"