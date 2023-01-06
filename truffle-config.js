
module.exports = {
    contracts_build_directory: "./truffle_build",
    networks: {
        // ganache
        development: {
            host: "127.0.0.1",
            port: 8545,
            network_id: "*", // Match any network id
            //gas: 6721975000,
            //gasPrice: 2000000000
        },
        // test polygon
        polygon_mumbai: {
            host: "https://polygon-mumbai.g.alchemy.com/v2/ra3_cFUS86_b2IUO3R6KYxshya_cFoVx",
            network_id: 8001,
        },
        polygon_main: {
            host: "https://polygon-mainnet.g.alchemy.com/v2/_mbmgCVAjytap9Q_zgnkBoPI_aRwJe-z",
            network_id: 137,
        },
    },
    compilers: {
        solc: {
            version: "^0.8.0",
            optimizer: {
                enabled: true,
                runs: 200
            }
        }
    },
    plugins: [
        'truffle-contract-size'
    ],
};
