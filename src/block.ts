import { calculateHash } from "./utils";
import type { BlockType } from "./types";

export class Block {
  block: BlockType;

  constructor(
    index: number,
    previousHash: string,
    data: string,
    difficulty: number,
    timestamp: number
  ) {

    this.block = {
      index,
      timestamp,
      previousHash,
      data,

      // adding additiomal fields to the object that are not in the constructor parameters yet

      nonce: 0, // should be initially 0 for the genesis
      hash: "" // just an empty string for now, will be populated later during mining
    };

    // using the mine function to mine the block with the given difficulty and assinging the value to the hash key in the object

    this.block.hash = this.mine(difficulty);
  }

  public mine(difficulty: number): string {
    const target = "0".repeat(difficulty);
    while (true) {
      const hash = calculateHash(this.block);

      // console.log(`Trying the hash: ${hash}`);

      if (hash.startsWith(target)) {
        // console.log(`valid hash found: ${hash}`)
        return hash;
      }

      this.block.nonce += 1;
    }
  }
}