# smart-contract

Installing ganache and truffle
==========================================================================
https://medium.com/haloblock/deploy-your-own-smart-contract-with-truffle-and-ganache-cli-beginner-tutorial-c46bce0bd01e

To run Ganache (private network)
ganache-cli

passphrase: Test@123

cd ganache
nvm use 8.10.0
npm install -g ganache-cli truffle
ganache-cli


To create new project for smart contract
$ mkdir Contracts
$ cd Contracts
$ truffle init


To create new contract in solidity.
truffle create contract HelloWorld

Compile:        truffle compile
Migrate:        truffle migrate
                  or
                truffle migrate -network development
                or
                truffle migrate --reset
		or
                truffle migrate --reset --all

truffle create migration 1_hello_world


to start truffle(development)
truffle console 
 

to test contracts
truffle test




Step 4: Deploy “HelloWorld” contract.

Step 4.1: Create a js file under migrations, name it “2_deploy_contracts.js”.


Step 4.2: Copy and past the following deploying content into the “2_deploy_contracts.js”.

var HelloWorld=artifacts.require (“./HelloWorld.sol”);
module.exports = function(deployer) {
      deployer.deploy(HelloWorld);
}

https://www.codementor.io/rogargon/exercise-simple-solidity-smart-contract-for-ethereum-blockchain-m736khtby


Deploying 'DappTokenSale'
   -------------------------
   > transaction hash:    0x12b6c33e517c94c96893b48941941774e4767ae8fce10ef3a76a46101d5e170c
   > Blocks: 0            Seconds: 0
   > contract address:    0x380ebA021c4c1CD859F95bd5b52Fc09A99e0472f
   > block number:        16
   > block timestamp:     1572162728
   > account:             0xbC687E03277C97482e4f998b7Fc339B73BE77C6C
   > balance:             99.92354002
   > gas used:            68922
   > gas price:           20 gwei
   > value sent:          0 ETH
   > total cost:          0.00137844 ETH


module.exports = {

    networks: {
      development: {
       host: "127.0.0.1",     // Localhost (default: none)
       port: 8545,            // Standard Ethereum port (default: none)
       network_id: "*",       // Any network (default: none)
      }
    },
    compilers: {
       solc: {
         version: '0.3.5'  // ex:  "0.4.20". (Default: Truffle's installed solc)
       }
    }
}



Links of More ERC 20 Token
https://medium.com/haloblock

Using Metamask
https://medium.com/openberry/deploying-smart-contracts-with-truffle-1c056b452cde

Not successful
https://medium.com/coinmonks/test-a-smart-contract-with-truffle-3eb8e1929370

https://etherconverter.online/

admin = web3.eth.getAccounts[0]

tokenInstance.balanceOf(admin)

receiver = web3.eth.accounts[1];
tokenInstance.transfer(receiver, 1, {from: admin})


Tools for auditing smart contract
https://tool.smartdec.net/


=====================Token Sales ===========

i. Provision Tokens to Token sale contract
ii. Set a token price in wei
iii. assignn adn admin
iv. buy tokens 
v. end sale

















Testnet For Etherium: Ropsten, Kovan and Rinkeby


Create private network
=====================================================================
https://medium.com/@yashwanthvenati/setup-private-ethereum-blockchain-network-with-multiple-nodes-in-5-mins-708ab89b1966
sudo apt-get install software-properties-common
sudo add-apt-repository -y ppa:ethereum/ethereum
sudo apt-get update                      
sudo apt-get -y install ethereum


geth --datadir ethdata account new
INFO [06-08|23:37:27.646] Maximum peer count                       ETH=25 LES=0 total=25
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {e49770ce14c99ced57266f9f8b4499ce42d8b978}

ranjanmondal@ranjan:~$ geth --datadir ethdata account new
INFO [06-08|23:41:50.067] Maximum peer count                       ETH=25 LES=0 total=25
Your new account is locked with a password. Please give a password. Do not forget this password.
Passphrase: 
Repeat passphrase: 
Address: {449ed8a03d95888f304f0346c7e919e9c22d5c9f}
ranjanmondal@ranjan:~$ 


{

    "config":{
        "chainId":15,
        "homesteadBlock":0,
        "eip155Block":0,
        "eip158Block":0
    },
    "difficulty":"200000",
    "gasLimit":"2100000000",
    "alloc":{
        "e49770ce14c99ced57266f9f8b4499ce42d8b978":{
            "balance":"11111111111111111111111111111111"
        },
        "449ed8a03d95888f304f0346c7e919e9c22d5c9f":{
            "balance":"22222222222222222222222222222222"
        }
    }

}

geth --datadir="ethdata" init genesis.json

geth --datadir="ethdata" --networkid 15 --nodiscover console --unlock 2c025be8ea13b5c82371b96f01c0c84dff203929 --rpc --rpcport "8000" --rpcaddr "0.0.0.0" --rpccorsdomain "*" --rpcapi "eth,net,web3,miner,debug,personal,rpc"



