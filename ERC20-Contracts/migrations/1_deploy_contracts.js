var DappToken = artifacts.require ("./DappToken.sol");
var DappTokenSale = artifacts.require ("./DappTokenSale.sol");

// Token price is 0.001 Ether
var tokenPrice = 1000000000000000;

module.exports = function(deployer) {
      deployer.deploy(DappToken, 1000000).then(function(){
            return DappToken.address;
            deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
      })
      // .then(function(address){
      //       deployer.deploy(DappTokenSale, address, tokenPrice);
      // });

      // deployer.deploy(DappTokenSale).then(function(){
      //   //    deployer.deploy(DappTokenSale, DappToken.address, tokenPrice);
      // });
}