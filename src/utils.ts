import * as crypto from "crypto";
import { BlockType } from "./types";

export function currentTimestamp(): number {
  return Math.floor(Date.now() / 1000);
}

export function generateString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function calculateHash(block: BlockType): string {

  const blockData = block.index + block.timestamp + block.previousHash + block.data + block.nonce;

  // using the createHash method from the crypto package that comes with nodejs, updating it with the data from the block, using digest hex method to get and return the final hex string

  const hash = crypto.createHash('sha256');
  hash.update(blockData);
  const hexedHash = hash.digest('hex');
  return hexedHash;
}