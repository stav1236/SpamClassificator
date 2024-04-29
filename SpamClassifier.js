import { BloomFilter } from "./BloomFilter.js";

//another way to achieve deletion when using Bloom filter data structure.
export class SpamClassifier {
  constructor(size) {
    this.spamList = new BloomFilter(size);
    this.deletedList = new BloomFilter(size);
  }

  Add_Spam(address) {
    this.spamList.Add_Spam(address);
  }

  Remove_Spam(address) {
    this.spamList.decItemsCount();
    this.deletedList.Add_Spam(address);
  }

  Is_Spam(address) {
    if (this.deletedList.Is_Spam(address)) return false; //is remove from the spam list

    return this.spamList.Is_Spam(address);
  }
}
