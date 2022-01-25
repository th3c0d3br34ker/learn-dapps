// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PandaToken is ERC20 {
    constructor() public ERC20("PandaToken", "PANDA") {
        _mint(msg.sender, 1000000000000000000000000);
    }
}
