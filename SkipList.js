import { MAX_SPAM_AMOUNT } from "common.js";

class Node {
  constructor(address = null) {
    this.address = address;
    this.next = [];
  }
}

class SkipList {
  constructor(size = MAX_SPAM_AMOUNT) {
    this.head = new Node();
    this.currentMaxLevel = 1;
    this.MAX_LEVEL = Math.ceil(Math.log2(size));
  }

  randomLevel() {
    let level = 1;

    while (Math.random() < 0.5 && level < this.MAX_LEVEL) {
      level++;
    }
    return level;
  }

  insert(address) {
    const newNode = new Node(address);
    const update = Array(this.currentMaxLevel).fill(null);
    let current = this.head;

    for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
      while (
        current.next[i] !== undefined &&
        current.next[i].address < address
      ) {
        current = current.next[i];
      }
      update[i] = current;
    }

    if (current.next[0] && current.next[0].address === address) {
      // Address already exists
      return;
    }

    const level = this.randomLevel();
    if (level > this.currentMaxLevel) {
      for (let i = this.currentMaxLevel; i < level; i++) {
        update[i] = this.head;
      }
      this.currentMaxLevel = level;
    }

    for (let i = 0; i < level; i++) {
      newNode.next[i] = update[i].next[i];
      update[i].next[i] = newNode;
    }
  }

  search(address) {
    let current = this.head;
    for (let i = this.currentMaxLevel - 1; i >= 0; i--) {
      while (
        current.next[i] !== undefined &&
        current.next[i].address < address
      ) {
        current = current.next[i];
      }
    }
    current = current.next[0];
    if (current && current.address === address) {
      return true; // Address found
    }
    return false; // Address not found
  }
}

export class SpamFilter {
  constructor() {
    this.spamList = new SkipList();
    this.spamCount = 0;
  }

  Add_Spam(address) {
    if (this.spamCount < MAX_SPAM_AMOUNT) {
      this.spamList.insert(address);
      this.spamCount++;
    } else {
      console.log("Spam list is full.");
    }
  }

  Is_Spam(address) {
    return this.spamList.search(address);
  }
}
