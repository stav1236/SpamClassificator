class BloomFilter {
  constructor(size) {
    this.size = size;
    this.bitArray = new Array(size).fill(false);
    this.numHashes = this.calculateNumHashes(size);
  }

  calculateNumHashes(size) {
    return Math.ceil((size / 100) * Math.log(2));
  }

  addSpam(address) {
    for (let seed = 0; seed < this.numHashes; seed++) {
      const position = this.hashAddress(address, seed);
      this.bitArray[position] = true;
    }
  }

  isSpam(address) {
    for (let seed = 0; seed < this.numHashes; seed++) {
      const position = this.hashAddress(address, seed);
      if (!this.bitArray[position]) {
        return false;
      }
    }
    return true;
  }

  hashAddress(address, seed) {
    const hashedAddress = this.hashFunction(address + seed.toString());
    return parseInt(hashedAddress, 16) % this.size;
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
