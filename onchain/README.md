# Setup

First install truffle `npm i -g truffle`\
Start a local truffle `truffle develop`

# Usage

To Compile contract :  `truffle compile`\
To Deploy contract  :  `truffle deploy`\
To Run the tests    :  `truffle test`\

To generate abi : `truffle-export-abi`

# Ropsten Setup
You need .env to setup the contracts on the testnet

### Example (.env)
```bash
MNEMONIC="your mnemonics here"
RPC_URL="your rpc url here"
```

To Deploy contract  :  `truffle deploy --network ropsten`\
To Run the tests    :  `truffle test --network ropsten`



## Ropsten network

### VDex Address: `0x9dc2241713540c543ddE805AE3e36Bc1c8815e57`

| Token       |   Address                                   |
------------- | ---------------------------------------------
| DAI   |`0xaD6D458402F60fD3Bd25163575031ACDce07538D` |
| WETH  |`0xc778417E063141139Fce010982780140Aa0cD5Ab` |
| UNI   |`0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984` |