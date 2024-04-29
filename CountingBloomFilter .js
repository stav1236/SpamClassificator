import { MAX_SPAM_AMOUNT, hashAddress, calculateNumHashes } from "./common.js";

export class CountingBloomFilter {
  constructor(size) {
    this.itemCount = 0;
    this.countArray = new Array(size).fill(0); // Initialize counters to zero
    this.numHashes = calculateNumHashes(size);
  }

  Add_Spam(address) {
    if (this.itemCount >= MAX_SPAM_AMOUNT) {
      console.log("Maximum item count reached. Cannot add more items.");
      return;
    }

    for (let seed = 0; seed < this.numHashes; seed++) {
      const position = this.hashAddress(address, seed);
      this.countArray[position]++;
    }

    this.itemCount++;
  }

  Remove_Spam(address) {
    if (!this.Is_Spam(address)) {
      console.log("Address not found in the filter.");
      return;
    }
    for (let seed = 0; seed < this.numHashes; seed++) {
      const position = this.hashAddress(address, seed);
      this.countArray[position]--;
    }

    --this.itemCount;
  }

  Is_Spam(address) {
    for (let seed = 0; seed < this.numHashes; seed++) {
      const position = this.hashAddress(address, seed);
      if (this.countArray[position] <= 0) {
        return false;
      }
    }
    return true;
  }

  hashAddress(address, seed) {
    return hashAddress(address, seed, this.countArray.length);
  }
}
