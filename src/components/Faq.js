import React from 'react';
import network from './config/config'
import './Faq.css';

const Faq = (props) => {

    return (
        <div className="card mb-3 border-light card--center faq card--extraMarginTop" id="faq">
            <div className="card-header">
            <h3>
            FAQ
            </h3>
            </div>
            <ul className="list-group list-group-flush">

                <li className="list-group-item">
                    <p className="faq-question">
                    What is a text-based NFT?
                    </p>
                    <p className="faq-answer">
                    A text-based NFT is a non-fungible token that represents a unique piece of digital art that consists of text. It is stored on a blockchain, which makes it tamper-proof and enables ownership to be verified.
                    </p>
                </li>

                <li className="list-group-item">
                    <p className="faq-question">
                    Why I would want to mint a text-based NFT?
                    </p>
                    <p className="faq-answer">
                    Minting a text-based NFT will ensure that your message will stay forever, just like when ancient people used to carve text on stone.
                    The message can not be changed, can not be censored, can not be deleted, can't be stolen.
                    </p>
                </li>

                <li className="list-group-item">
                    <p className="faq-question">
                    How do I connect my wallet?
                    </p>
                    <p className="faq-answer">
                    Please install <a href="https://metamask.io/download/" target="_blank" rel="noreferrer">Metamask</a> browser extension.
                    Your wallet must be connected to the <a href="https://polygon.technology/" rget="_blank" rel="noreferrer">Polygon network</a> and have some MATIC tokens available for you to be able to mint your NFT.
                    </p>
                </li>

                <li className="list-group-item">
                    <p className="faq-question">
                    Is it public? Anybody can see my NFT?
                    </p>
                    <p className="faq-answer">
                    Yes, your NFT will be visible by everyone. Even if we remove it from this website it will still be available in the blockchain.
                    </p>
                </li>

                <li className="list-group-item">
                    <p className="faq-question">
                    I made a mistake, I want to change/delete the text of my NFT.
                    </p>
                    <p className="faq-answer">
                    I am sorry you can't. Once it's minted it's like a tattoo - it never goes away. That's the point of blockchain tech.
                    </p>
                </li>

                <li className="list-group-item">
                    <p className="faq-question">
                    What is the price for minting a Text on Stone NFT?
                    </p>
                    <span className="faq-answer">
                    Pricing for minting a NFT is dynamic and is calculated by the <code>updatePrice</code> function in the Smart Contract.
                    The rules for calculating pricing are:
                    <ul>
                        <li>Minimum price is 1 MATIC and max price is 7777 MATIC</li>
                        <li>For each 7 NFTs minted, price will increase</li>
                        <li>Price increase is calculated by the following formula: <code>new price = old price + 2</code></li>
                    </ul>
                    As an example, the first 7 NFTs to be minted cost 1 MATIC each, the next 7 to be minted will cost 3 (1+2) MATIC each, and so on.
                    <p>You can always find the current price written on the mint button. Current mint cost is {props.minCost}.</p>
                    </span>
                </li>


                <li className="list-group-item">
            <p className="faq-question">
            Can I sell my text-based NFT?
            </p>
            <p className="faq-answer">
            Yes, you can sell your text-based NFT on platforms like <a href="https://opensea.io/" target="_blank" rel="noreferrer">OpenSea</a>. NFTs are highly valuable and sought after by collectors and art enthusiasts, so if you create a unique and memorable text-based NFT, it may be worth a high price.
            </p>
            </li>
                <li className="list-group-item">
            <p className="faq-question">
            Is my text-based NFT safe and secure?
            </p>
            <p className="faq-answer">
            Yes, your text-based NFT is safe and secure on the Text on Stone NFT Collection platform. It is stored on the blockchain, which means it cannot be altered or counterfeited.
            </p>
            </li>
                <li className="list-group-item">
            <p className="faq-question">
            Is there a limit to the number of text-based NFTs I can create?
            </p>
            <p className="faq-answer">
            There is a limit of the total number of Text on Stone NFTs that can be ever minted. The max supply is 777777.
            Besides that, there is no limit to the number of text-based NFTs you can create on the Text on Stone NFT Collection platform. You can create as many as you like, as long as you have the necessary resources (e.g. cryptocurrency) to mint them.
            </p>
            </li>
                <li className="list-group-item">
            <p className="faq-question">
            Can I customize the appearance of my text-based NFT?
            </p>
            <p className="faq-answer">
            Yes, you can customize the appearance of your text-based NFT on the Text on Stone NFT Collection platform by choosing your own background, font, colors, and text. This allows you to create a unique and personalized piece of digital art.
            However, once it is minted, the NFT is immutable - it can never be changed.
            </p>
            </li>
                <li className="list-group-item">
            <p className="faq-question">
            Can I use my own text or do I have to choose from a pre-determined list?
            </p>
            <p className="faq-answer">
            You can use your own text when creating your text-based NFT on the Text on Stone NFT Collection platform. You have complete control over the content of your NFT, so you can choose the words that best reflect your style and personality.
            You can store a maximum limit of 300 characters approximately (it's 300 bytes to be exact).
            Also please be aware that once you mint your NFT, the NFT becomes immutable - all the text and NFT appearance can never be changed.
            </p>
            </li>
                <li className="list-group-item">
            <p className="faq-question">
            How do I know that I am the owner of my text-based NFT?
            </p>
            <p className="faq-answer">
            When you mint your text-based NFT on the Text on Stone NFT Collection platform, it is added to the blockchain and becomes your property. The ownership of your NFT is verified through the blockchain, so you can be confident that you are the true owner.
            </p>
            </li>
                <li className="list-group-item">
            <p className="faq-question">
            Can I use my text-based NFT for commercial purposes?
            </p>
            <p className="faq-answer">
            Yes, you can use your text-based NFT for commercial purposes if you wish. You have full control over your NFT and can use it in any way that you see fit, as long as it is legal and ethical.
            </p>
            </li>
            <li className="list-group-item">
            <p className="faq-question">
            How do I store my text-based NFT?
            </p>
            <p className="faq-answer">
            Your text-based NFT is stored on the blockchain, so you don't have to worry about physically storing it. However, it is important to keep your NFT safe by securely storing your private keys and taking other necessary precautions.
            </p>
            </li>

            <li className="list-group-item">
            <p className="faq-question">
            Where can I inspect the Text on Stone smart contract?
            </p>
            <p className="faq-answer">
            <a href={network.chainExplorer + network.contractAddress()} target="_blank" rel="noreferrer">Please follow this link.</a>
            </p>
            </li>

            </ul>
        </div>

    );

}

export default Faq;
