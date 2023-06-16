// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
struct Diplome {
    string cin;
    string niveauRef;
}

contract SimpleStorage {
    uint public diplomeCount = 0;
    mapping(uint => Diplome) public diplomes;

    function addDiplome(string memory _cin, string memory _niveauRef) public {
        diplomes[diplomeCount] = Diplome(_cin, _niveauRef);
        diplomeCount++;
    }
}
