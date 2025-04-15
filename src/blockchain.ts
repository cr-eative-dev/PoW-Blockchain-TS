import { Block } from "./block";
import { BlockType } from "./types";
import { calculateHash, currentTimestamp, generateString } from "./utils";

export class Blockchain {
  public chain: Block[] = [];
  private difficulty: number;
  public balances: Map<string, number> = new Map();

  constructor(difficulty: number) {
    this.difficulty = difficulty;
    this.createGenesisBlock(difficulty)
  }

  // Create the genesis block
  private createGenesisBlock(difficulty: number): void {
    const genesisBlock = new Block(
      0,
      "0",
      "Genesis Block",
      this.difficulty,
      currentTimestamp()
    );
    this.chain.push(genesisBlock);
  }

  public lastBlock(): BlockType {
    return this.chain[this.chain.length - 1].block;
  }

  public addBlock(data: string): void {
    const lastBlock = this.lastBlock();
    const newBlock = new Block(
      lastBlock.index + 1,
      lastBlock.hash,
      data,
      this.difficulty,
      currentTimestamp()
    );
    this.chain.push(newBlock);
  }

  isValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i].block;
      const previousBlock = this.chain[i - 1].block;

      // checking the connection to previous block
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      // does the current block have a valid hash?
      const validHash = calculateHash(currentBlock);
      if (currentBlock.hash !== validHash) {
        return false;
      }

      // checkin POW algo by ensuring the hash was difficult enough to calculate, must start with 4 0s as per index.ts
      if (!currentBlock.hash.startsWith("0".repeat(this.difficulty))) {
        return false;
      }
    }
    return true;
  }

  public transferBalance(
    sender: string,
    receiver: string,
    amount: number
  ): boolean {
    const balanceSender = this.balances.get(sender) || 0;

    if (balanceSender < amount) {
      console.log("Not enough funds !!!");
      return false;
    }

    const balanceReceiver = this.balances.get(receiver) || 0;
    this.balances.set(sender, balanceSender - amount);
    this.balances.set(receiver, balanceReceiver + amount);

    console.log("Funds have been sent !!!")
    return true;
  }

  public showBalances(): void {
    console.log("Balances: ", Object.fromEntries(this.balances));
  }

  async mineContinuously() {
    let indexer = 0;
    const accounts = ["John", "Mark", "Bob", "Tod"]

    // Infinite loop to continuously create blocks
    while (true) {

      // only adding funds if the balance is empty
      if (indexer === 0) {
        accounts.forEach(account => {
          if (!this.balances.has(account)) {
            this.balances.set(account, 1000);
          }
        });
        console.log("Initial balances set:");
        this.showBalances();
      }

      // random transfers every 4 to 9 blocks
      if (indexer > 0 && indexer % Math.floor(Math.random() * 6 + 4) === 0) {
        const sender = accounts[Math.floor(Math.random() * accounts.length)];
        let receiver;
        do {
          receiver = accounts[Math.floor(Math.random() * accounts.length)];
        } while (receiver === sender);

        const amount = Math.floor(Math.random() * 100) + 1; // Random amount from one to 100
        console.log(`\nTrying to send ${amount} from ${sender} to ${receiver}`);

        this.transferBalance(sender, receiver, amount);
        this.showBalances();
      }

      // added a log so we can see the mined block
      const newBlockData = generateString(32);
      console.log(`\nMining block ${indexer + 1} with data: ${newBlockData}`);

      this.addBlock(newBlockData);

      // Wait for a bit before mining the next block
      await new Promise((resolve) => setTimeout(resolve, 1000));
      indexer++;
    }
  }
}
