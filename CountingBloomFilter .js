class CountingBloomFilter {
  constructor(size) {
    this.itemCount = 0;
    this.countArray = new Array(size).fill(0); // Initialize counters to zero
    this.numHashes = this.calculateNumHashes(size);
  }

  calculateNumHashes(size) {
    return Math.ceil((size / 100) * Math.log(2));
  }

  Add_Spam(address) {
    if (this.itemCount >= 100) {
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
    const hashedAddress = this.hashFunction(address + seed.toString());
    return Math.abs(parseInt(hashedAddress, 16)) % this.size;
  }

  hashFunction(input) {
    let hash = 0;
    if (input.length === 0) return hash;
    for (let i = 0; i < input.length; i++) {
      const char = input.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash |= 0; // Convert to 32-bit integer
    }
    return hash.toString(16);
  }
}
