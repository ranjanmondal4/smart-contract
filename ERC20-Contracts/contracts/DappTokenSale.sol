pragma solidity ^0.5.0;
import './DappToken.sol';

contract DappTokenSale {
  address admin;
  DappToken public tokenContract;
  uint256 public tokenPrice;

  constructor(DappToken _tokenContract, uint256 _tokenPrice) public {
    // Assign an Admin
    admin = msg.sender;
    // Token contract
    tokenContract = _tokenContract;
    // Token price
    tokenPrice = _tokenPrice;
  }

  function buyTokens(uint256 _numberOfTokens) public payable {
    // Require that value is equal to tokens
    // Require that the contract has enough tokens
    // Require that a transfer is successfull
    // Keep track of token sold
    // Trigger Sell event
  }
}
