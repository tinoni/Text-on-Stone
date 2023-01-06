import TextOnStone from '../../abis/TextOnStone.json';


/**
 * Important: can not be transformed into an arrow function otherwise 'this.chain_id_int' will not work as intended
 * @returns Smart Contract address
 */
function getConstractAddress () {
    return TextOnStone.networks[this.chain_id_int].address;
}

const networks = {
    // local ganache
    ganache: {
        name: 'ganache',
        url: 'http://127.0.0.1:8545',
        chain_id: '0x539',  // check https://chainlist.org/
        chain_id_int: '1337',
        currency: 'ETH',
        opensea: 'https://testnets.opensea.io/assets/mumbai/',
        chainExplorer: 'https://mumbai.polygonscan.com/address/',
        contractAddress: getConstractAddress,
    },
    // polygon test
    mumbai: {
        name: 'mumbai',
        url: 'https://rpc.ankr.com/polygon_mumbai',
        chain_id: '0x13881',  // check https://chainlist.org/
        chain_id_int: '80001',
        currency: 'MATIC',
        opensea: 'https://testnets.opensea.io/assets/mumbai/',
        chainExplorer: 'https://mumbai.polygonscan.com/address/',
        contractAddress: getConstractAddress,
    },
    // polygon mainnet
    polygon: {
        name: 'polygon',
        url: 'https://rpc.ankr.com/polygon',
        chain_id: '0x89',  // check https://chainlist.org/
        chain_id_int: '137',
        currency: 'MATIC',
        opensea: 'https://opensea.io/assets/matic/',
        chainExplorer: 'https://polygonscan.com/address/',
        contractAddress: getConstractAddress,
    }
};

const current_network = 'ganache';

const network = networks[current_network];

export default network;