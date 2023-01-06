# Text on Stone NFT

https://www.textonstone.com/

## Technology Stack & Tools

- Solidity (Writing Smart Contract)
- Javascript (React & Testing)
- [Web3](https://web3js.readthedocs.io/en/v1.5.2/) (Blockchain Interaction)
- [Truffle](https://www.trufflesuite.com/docs/truffle/overview) (Development Framework)
- [Ganache](https://www.trufflesuite.com/ganache) (For Local Blockchain)

## Requirements For Initial Setup
- Install [NodeJS](https://nodejs.org/en/), should work with any node version below 16.5.0
- Install [Truffle](https://www.trufflesuite.com/docs/truffle/overview), In your terminal, you can check to see if you have truffle by running `truffle version`. To install truffle run `npm i -g truffle`. Ideal to have truffle version 5.4 to avoid dependency issues.
- Install [Ganache](https://www.trufflesuite.com/ganache).

## Setting Up
### 1. Clone/Download the Repository

### 2. Install Dependencies:
```
npm install --force
```

--force is necessary because of react-timestamp

### 3. Start Ganache

### 4. Migrate Smart Contracts
`truffle migrate --reset --network development`

or

`truffle dashboard`
`truffle migrate --network dashboard`

### 5. Check contract sizes
`truffle run contract-size --checkMaxSize`

### 6. Run Tests
`truffle test`

### 7. Run a Script
`truffle exec ./scripts/some_script.js`

### 8. Test on opensea

Deploy to rinkeby (or mumbai) and search your contract address on
https://testnets.opensea.io/

### 9. Run React site
`npm run start`

### 10. Install and configure metamask
Install metamask in your browser and configure it to use ganache. Import a ganache account

### 11. Deploy
`npm run build`
Build will be in build folder

Copy files to your server
`scp -r build user@server:/var/www/textonstone/public/`
