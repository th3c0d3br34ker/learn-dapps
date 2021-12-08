// SPDX-License-Identifier: MIT

pragma solidity >=0.7.4;

contract Counter {
    int256 public counter = 0;

    function increment() public {
        counter++;
    }

    function decrement() public {
        counter--;
    }

    function get() public view returns (int256) {
        return counter;
    }
}
