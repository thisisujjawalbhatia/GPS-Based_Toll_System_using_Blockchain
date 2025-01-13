# Blockchain-Based Toll Application - Truffle Smart Contract

This project contains a test smart contract written in Solidity, deployed to a Ganache test blockchain using Truffle.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [Truffle](https://www.trufflesuite.com/truffle)
- [Ganache](https://www.trufflesuite.com/ganache)

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/Blockchain-Based-TollApplication.git
    cd Blockchain-Based-TollApplication/Truffle-SmartContract
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

## Usage

1. Start Ganache:
    ```sh
    ganache-cli
    ```

2. Compile the smart contract:
    ```sh
    truffle compile
    ```

3. Migrate the smart contract to the Ganache blockchain:
    ```sh
    truffle migrate
    ```

4. Run the tests:
    ```sh
    truffle test
    ```

## Project Structure

- `contracts/`: Contains the Solidity smart contracts.
- `migrations/`: Deployment scripts for the smart contracts.
- `test/`: Test scripts for the smart contracts.
- `truffle-config.js`: Truffle configuration file.

## License

This project is licensed under the MIT License. See the [LICENSE](../LICENSE) file for details.

## Acknowledgements

- [Truffle Suite](https://www.trufflesuite.com/)
- [Ganache](https://www.trufflesuite.com/ganache)
- [Solidity](https://soliditylang.org/)
