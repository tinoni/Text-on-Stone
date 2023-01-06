import React, { useState, useEffect } from 'react';
import { ReactNotifications, Store } from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import Web3 from 'web3'
import './App.css';
import TextOnStone from '../abis/TextOnStone.json';
import Navbar from './Navbar';
import Footer from './Footer';
import Main from './Main';
import network from './config/config'


/**
 * Display a message to the user
 * @param {string} title
 * @param {string} message
 */
export const info = (title, message = '', duration = 15000) => {
    Store.addNotification({
        title: title,
        message: message,
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        dismiss: {
            showIcon: true,
            duration: duration,
            onScreen: true
        }
    });
};

/**
 * Display an error message to the user
 * @param {string} title
 * @param {string} message
 */
export const error = (title, message = '', duration = 15000) => {
    message += ' Make sure you are connected to ' + network.name + ' network with Metamask.';
    Store.addNotification({
        title: title,
        message: message,
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        dismiss: {
            showIcon: true,
            duration: duration,
            onScreen: true
        }
    });
};

const App = (props) => {

    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [nftCount, setNftCount] = useState(0);
    const [nfts, setNfts] = useState([]);
    const [minCost, setMinCost] = useState(0);
    const [loading, setLoading] = useState(true);
    const [chainId, setChainId] = useState(null);


    window.ethereum?.on('chainChanged', (lChainId) => {
        // Handle the new chain.
        // Correctly handling chain changes can be complicated.
        // We recommend reloading the page unless you have good reason not to.
        console.log(lChainId);
        setChainId(lChainId);
        window.location.reload();
    });


    window.ethereum?.on('accountsChanged', (accounts) => {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            setAccount(null);
        } else {
            setAccount(accounts[0]);
        }
    });


    /**
     * Handler for connect button
     */
    const connectUser = async () => {
        let r = await connectMetamask();
        if (r) {
            await connectContract();
        }
    };


    /**
     * Connects user's Metamask
     * @returns User account or null
     */
    const connectMetamask = async () => {
        if (!window.ethereum) {
            error('Please install Metamask', 'To mint NFTs you must install MetaMask.');
            return null;
        }

        try {
            window.web3 = new Web3(window.ethereum);
            const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
            if (!accounts.length) {
                console.log('Could not connect to Metamask - no accounts found')
                return null;
            }

            const currentChainId = await window.ethereum.request({method: 'eth_chainId'});
            console.log('currentChainId', currentChainId);
            setChainId(currentChainId);

            // switch chain
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: network.chain_id}],
            });
            setAccount(accounts[0]);
            return accounts[0];

        } catch (e) {
            console.log(e);
        }

        return null;
    };


    /**
     * Called on window load to check if user is already connected
     * @returns void
     */
    const loadWeb3 = async () => {
        if (!window.ethereum) {
            console.log('Non-Ethereum browser detected', 'To mint NFTs you must install MetaMask!');
        }

        try {
            window.web3 = new Web3(network.url);

            // check if we have any account connected already
            const accounts = await window.ethereum.request({method: 'eth_accounts'});
            if (!accounts.length) {
                return;
            }

            const currentChainId = await window.ethereum.request({method: 'eth_chainId'});
            console.log('currentChainId', currentChainId);
            setChainId(currentChainId);

            // switch chain
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId: network.chain_id}],
            });

            setAccount(accounts[0]);

        } catch (e) {
            console.log(e);
        }

    };


    /**
     * Connect to Text On Stone smart contract
     * @returns The contract or null
     */
    const connectContract = async () => {
        let lContract = null;
        try {
            const web3 = window.web3;
            const networkId = await web3.eth.net.getId();
            const networkData = TextOnStone.networks[networkId];
            if (networkData) {
                lContract = new web3.eth.Contract(TextOnStone.abi, networkData.address)
                setContract(lContract);
            } else {
                setContract(null);
                console.log('TextOnStone contract not deployed to detected network.');
            }
        } catch (error) {
            console.log(error);
        }

        return lContract;
    }


    /**
     * Loads recently minted NFTs
     */
    const loadBlockchainData = async (lContract) => {
        lContract = lContract ?? contract;

        if (lContract == null) {
            error('TextOnStone contract not connected');
            return;
        }

        const lNftCount = await lContract.methods.getTokenId().call();
        setNftCount(lNftCount);

        // TODO: lazy loading instead of loading all together
        // Load texts
        for (let i = lNftCount; i >= 0; i--) {
            const nft = await lContract.methods.tokenData(i).call();
            const nft_ob = {
                tokenId: nft[0].toString(),
                text: nft[1].toString(),
                owner: nft[3].toString(),
                image: nft[2].toString(),
                timestamp: nft[4] ? nft[4].toString() : '0',
                url: network.opensea + network.contractAddress() + '/' + nft[0].toString(),
            };

            setNfts((prevState) => {
                return [...prevState, nft_ob];
            });
        }

        // Get minting price
        const lMintCost = await lContract.methods.currentMintCost().call();
        setMinCost(lMintCost);

        setLoading(false);
    }


    /**
     * Runs when React component is first loaded
     */
    useEffect(() => {
        const lload = async () => {
            await loadWeb3();
            const c = await connectContract();
            await loadBlockchainData(c);
        }
        lload();
    }, []);




    /**
     * Mint a new NFT
     * @param {*} text The text to mint
     * @param {*} appearance The appearance bits that will tell what the SVG will look like
     */
    const mint = async (text, appearance) => {
        var lAccount = await connectMetamask();
        if (lAccount == null) {
            console.log('Can not connect Metamask');
            return;
        }

        var lContract = await connectContract();
        if (lContract == null) {
            console.log('Can not connect Metamask');
            return;
        }

        info('Minting process is now starting', 'The minting process will start after you approve the transaction. It can take a few minutes to process, so please be patient.', 60000);

        const svg = await lContract.methods.tokenSvgSimulate(text, appearance).call();
        await lContract.methods.mintText(text, appearance).send({
                from: lAccount, value: minCost
            })
            .once('receipt', (receipt) => {
                let nft = {
                    tokenId: receipt.events.ContentAdded.returnValues.tokenId,
                    text: receipt.events.ContentAdded.returnValues.text,
                    owner: receipt.events.ContentAdded.returnValues.owner,
                    image: svg,
                    timestamp: Date.now() / 1000,
                    url: network.opensea + network.contractAddress() + '/' + receipt.events.ContentAdded.returnValues.tokenId,
                }
                setNfts((prevState) => {
                    return [nft, ...prevState];
                });
                info('Your new brand NFT has been minted!');
            })
            .once('error', (err, receipt) => {
                console.log(err);
                error('Error minting NFT', 'There was an error or you aborted the process of minting.');
            });

        const lMintCost = await lContract.methods.currentMintCost().call();
        setMinCost(lMintCost);
    }


    const preview = async (text, appearance) => {
        if (contract == null) {
            error('TextOnStone contract not connected');
            return;
        }

        const svg = await contract.methods.tokenSvgSimulate(text, appearance).call();
        return svg;
    }


    return (
        <div>
            <ReactNotifications/>
            <Navbar account={account} onConnect={connectUser}/>
            <div className="container-fluid mt-5">
                <main role="main">
                { loading
                    ? <div className="d-flex justify-content-center spinner"><div className="spinner-border" role="status"><span className="visually-hidden">Loading...</span></div></div>
                    : <Main
                        nfts={nfts}
                        mint={mint}
                        preview={preview}
                        minCost={minCost}>
                    </Main>
                }
                </main>
            </div>

            { !loading && <Footer/> }

        </div>
    );

}

export default App;
