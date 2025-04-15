import { Block } from "../src/block";
import { currentTimestamp } from "../src/utils";
import { Blockchain } from "../src/blockchain";

// testing a more realistic data input for the block
test("create block with data similar to an example transaction", () => {
  const mockTransaction = {
    from: "0x434353463464356534234346346656",
    to: "0x34534534534645645756856856745345",
    amount: 99.999
  };
  const block = new Block(1, "0", JSON.stringify(mockTransaction), 2, currentTimestamp());
  expect(block.block.data).toBe(JSON.stringify(mockTransaction));
});

// check account balances before spending
test("check account balances before sending funds", () => {
  const blockchain = new Blockchain(4); // hard coded for testing cuz I dont want to make the difficulty public
  blockchain.balances.set("Bob", 100);

  // first transfer can go through
  const firstTransfer = blockchain.transferBalance("Bob", "Tod", 70);
  expect(firstTransfer).toBe(true);
  expect(blockchain.balances.get("Bob")).toBe(30);

  // second transfer should be blocked and balance should remain unchanged
  const secondTransfer = blockchain.transferBalance("Bob", "Alice", 50);
  expect(secondTransfer).toBe(false);
  expect(blockchain.balances.get("Bob")).toBe(30);
});

test("initial balance distribution checking", () => {
  const blockchain = new Blockchain(4); // hard coded for testing cuz I dont want to make the difficulty public
  const mockAccounts = ["Bob", "Alice", "John", "Tod"];

  // Mocking first use of mineContinuously
  mockAccounts.forEach(account => {
    blockchain.balances.set(account, 1000);
  });

  mockAccounts.forEach(account => {
    expect(blockchain.balances.get(account)).toBe(1000);
  });
});