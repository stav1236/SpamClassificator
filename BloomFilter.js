import { MAX_SPAM_AMOUNT, hashAddress, calculateNumHashes } from "./common.js";

export class BloomFilter {
  constructor(size) {
    this.itemCount = 0;
    this.bitArray = new Array(size).fill(false);
    this.numHashes = calculateNumHashes(size);
  }

  Add_Spam(address) {
    if (this.itemCount >= MAX_SPAM_AMOUNT) {
      console.log("Maximum item count reached. Cannot add more items.");
      return;
    }

    for (let seed = 0; seed < this.numHashes; seed++) {
      const position = this.hashAddress(address, seed);
      this.bitArray[position] = true;
    }

    this.itemCount++;
  }

  Is_Spam(address) {
    for (let seed = 0; seed < this.numHashes; seed++) {
      const position = this.hashAddress(address, seed);
      if (!this.bitArray[position]) {
        return false;
      }
    }
    return true;
  }

  hashAddress(address, seed) {
    return hashAddress(address, seed, this.bitArray.length);
  }
}
