coinbase 0xf3f65f64229ee68e67f3ae3a2c60790f44f030fb
Password seed 

personal.unlockAccount(0xf3f65f64229ee68e67f3ae3a2c60790f44f030fb, "seed", 15000)

https://medium.com/blockchainbistro/set-up-a-private-ethereum-blockchain-and-deploy-your-first-solidity-smart-contract-on-the-caa8334c343d

https://bangladroid.wordpress.com/2017/09/26/install-homebrew-in-ubuntu/
brew update
brew vendor-install ruby
brew update

geth --unlock 0xf3f65f64229ee68e67f3ae3a2c60790f44f030fb --password seed
or 
geth --unlock 0xf3f65f64229ee68e67f3ae3a2c60790f44f030fb


To manage ethereum accounts
https://github.com/ethereum/go-ethereum/wiki/Managing-your-accounts

Steps for installing GETH
$ brew tap ethereum/ethereum
$ brew install ethereum

Step 2: 
i. Configuring the genesis block, and
ii. Initiating the chain data in the blockchain
$ mkdir blockchain
$ cd blockchain
$ touch genesis.json

Step 3. Adding contents of Genesis block

{
    "config": {
        "chainId": 143,
        "homesteadBlock": 0,
        "eip155Block": 0,
        "eip158Block": 0
    },
    "alloc": {},
    "difficulty" : "0x20000",
    "gasLimit"   : "0x8880000"
}

Explanation of the config file:
chainId: A unique identifier of the new private blockchain
homesteadBlock: Homestead is the first production release of Ethereum and since the developers are already using this version the value of this parameter can be left as ‘0’.
eip155Block/eip158Block: EIP stands for “Ethereum Improvement Proposals”, these were implement to release Homestead. In a private blockchain development hard forks aren’t needed, hence the parameter value should be left as ‘0’.
difficulty: controls the complexity of the mining puzzle and a lower value enables quicker mining.
gasLimit: Establishes an upper limit for executing smart contracts.
alloc: allows allocation of Ethers to a specific address.

Step 4. Creating the folder where your blockchain will reside
$ mkdir chaindata
$ geth --datadir chaindata init genesis.json
The second line initializes the blockchain and the blockchain data will be stored in the “chaindata” folder. This folder will grow in size as data is added to the blockchain, and if this folder is deleted the block chain will need to be reinitialized.


geth --port 3000 --networkid 58343 --nodiscover --datadir=./chaindata --maxpeers=0  --rpc --rpcport 8543 --rpcaddr 127.0.0.1 --rpccorsdomain "*" --rpcapi "eth,net,web3,personal,miner"

Explanation of the command line above:
— networkid: identity of your Ethereum network for other peers to discover. You can use any random number of your choice(except the ones listed below) to create your own network and to prevent others from inadvertently connecting to your network.


— nodiscover: Disables the peer discovery mechanism (manual peer addition).
— datadir: indicates the data directory where your blockchain will reside.
— maxpeers: Maximum number of network peers (network disabled if set to 0) (default: 25)
— rpc: Enable the HTTP-RPC server
— rpcapi: this allows us to communicate with the Ethereum network using the web3js RPC methods in the Geth Javascript console.


Step. Connect to the private Ethereum blockchain using the Geth Javascript console.
Open a new command terminal and navigate to the “projects” folder. Run the following to launch the Geth Javascript Console,
$ geth attach http://127.0.0.1:8543
This will open the Geth Javascript console, that is connected to the private Ethereum blockchain network running on localhost:8543

Step. Create an account and “mine” for dummy Ether.
The Geth Javascript console, provides web3js api’s to create a new account. Use the following Geth commands to create a new account and unlock it.
> personal.newAccount('seed')
> personal.unlockAccount(web3.eth.coinbase, "seed", 15000)

You can now start mining dummy “ether” using miner.start()
> miner.start()

To check your “ether” balance, use the following command in the Geth Console.
web3.fromWei(eth.getBalance(eth.coinbase), "ether")
And to stop mining use,
miner.stop()

Please go through link with Amit
https://ethereum.stackexchange.com/questions/8684/error-no-key-for-given-address-or-file-when-unlocking-coinbase-account