pragma solidity ^0.5.0;


contract Erc777 {
  //using SafeMath for uint256;
  //using Address for address;

  string public name = 'E777 Token';
  string public symbol = 'E777';
  string public standard = 'E777 Token v1.0';
  uint256 public granularity = 1;
  uint256 public totalSupply;
  mapping(address => uint256) public balanceOf;
  // ERC20-allowances
  mapping(address => mapping (address => uint256)) public allowance;

  // Immutable, but accounts may revoke them (tracked in __revokedDefaultOperators).
    mapping(address => bool) public defaultOperators;

    // For each account, a mapping of its operators and revoked default operators.
    mapping(address => mapping(address => bool)) public operators;
    mapping(address => mapping(address => bool)) public revokedDefaultOperators;


  constructor() public {
  }
}
