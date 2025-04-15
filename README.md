# TS Proof-of-Work Blockchain

A simple yet fully functional proof-of-work blockchain implementation written in TypeScript. This project demonstrates the core concepts of blockchain technology including mining, proof-of-work consensus, transaction validation, and blockchain integrity verification.

## Features

- **Block Mining**: Implements proof-of-work algorithm with adjustable difficulty
- **Blockchain Validation**: Verifies the integrity and continuity of the blockchain
- **Account System**: Manages account balances and transfers between accounts
- **Transaction System**: Simulates random transactions between accounts
- **Genesis Block**: Automatically creates the first block in the chain
- **Continuous Mining**: Automatically mines new blocks at regular intervals

## Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd ts-blockchain
npm install
```

## Usage

### Running the Blockchain

To start the blockchain and begin mining:

```bash
npm run start
```

This will start continuous mining with random transactions between accounts occurring every few blocks.

### Running Tests

To run the test suite:

```bash
npm test
```

## Project Structure

- `src/block.ts` - Block class implementation
- `src/blockchain.ts` - Core blockchain functionality
- `src/index.ts` - Main entry point
- `src/types.ts` - TypeScript type definitions
- `src/utils.ts` - Utility functions for hashing and timestamp generation
- `tests/general.test.ts` - Test cases for blockchain functionality

## Core Concepts

### Block Structure

Each block contains:
- Index - Position in the blockchain
- Timestamp - When the block was created
- Previous Hash - Hash of the previous block
- Data - Block payload (can represent transactions or any data)
- Nonce - Number used for proof-of-work
- Hash - Current block's hash

### Mining Process

The mining process works by:
1. Creating a new block with the given data
2. Incrementing the nonce value
3. Calculating the block's hash
4. Checking if the hash meets the difficulty requirement (starts with a specific number of zeros)
5. If not, repeating steps 2-4 until a valid hash is found

### Account System

The blockchain includes a simple account system that:
- Maintains a balance for each account
- Allows transferring funds between accounts
- Prevents transfers when the sender has insufficient funds
- Randomly generates transactions during continuous mining

## Example Block

```typescript
{
  index: 1,
  timestamp: 1713275426,
  previousHash: "000012a8c82d...",
  data: "Example transaction data",
  nonce: 3582,
  hash: "0000a2b9c3d4..."
}
```