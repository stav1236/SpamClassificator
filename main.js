import { SpamFilter } from "./SkipList.js";
import { BloomFilter } from "./BloomFilter.js";
import { generateEmailAddress } from "./common.js";
import { SpamClassifier } from "./SpamClassifier.js";
import { CountingBloomFilter } from "./CountingBloomFilter .js";

const DATA_SIZE = 500000;
const SPAM_EMAILS_AMOUNT = 100;
const TEST_SET_SIZE = 10;
const SPLIT_INDEX = 100000;
const NEW_SPAM_AMOUNT = 50;

const emails = [];
for (let i = 0; i < DATA_SIZE; i++) {
  emails.push(generateEmailAddress());
}

const spamList = [];
while (spamList.length < SPAM_EMAILS_AMOUNT) {
  const randomIndex = Math.floor(Math.random() * DATA_SIZE);
  const randomEmail = emails[randomIndex];
  if (!spamList.includes(randomEmail)) {
    spamList.push(randomEmail);
  }
}

const testSet = [];

while (testSet.length < TEST_SET_SIZE) {
  const randomIndex = Math.floor(Math.random() * spamList.length);
  const randomEmail = spamList[randomIndex];
  if (!testSet.includes(randomEmail)) {
    testSet.push(randomEmail);
  }
}

//part 1
console.log("start test part 1");
const spamClassifier1 = new BloomFilter(16000);

spamList.forEach((spamEmail) => spamClassifier1.Add_Spam(spamEmail));

console.log(
  `All test set are passed :  ${testSet.every((test) =>
    spamClassifier1.Is_Spam(test)
  )}`
);

let falsePositive1 = -SPAM_EMAILS_AMOUNT;

emails.forEach((email) => {
  if (spamClassifier1.Is_Spam(email)) falsePositive1++;
});

console.log(`the amount of false positive in case 1 are : ${falsePositive1}`);

//part 2
console.log("start test part 2");

const spamClassifier2 = new SpamFilter();

spamList.forEach((spamEmail) => spamClassifier2.Add_Spam(spamEmail));

console.log(
  `All test set are passed :  ${testSet.every((test) =>
    spamClassifier2.Is_Spam(test)
  )}`
);

let falsePositive2 = -SPAM_EMAILS_AMOUNT;

emails.forEach((email) => {
  if (spamClassifier2.Is_Spam(email)) falsePositive2++;
});

console.log(`the amount of false positive in case 2 are : ${falsePositive2}`);

//part 3
console.log("start test part 3");

// const spamClassifier3 = new SpamClassifier(16000); //another way for ex 3
const spamClassifier3 = new CountingBloomFilter(16000);

spamList.forEach((spamEmail) => spamClassifier3.Add_Spam(spamEmail));

console.log(
  `All test set are passed :  ${testSet.every((test) =>
    spamClassifier3.Is_Spam(test)
  )}`
);

const firstPart = emails.slice(0, SPLIT_INDEX);
const lastPart = emails.slice(SPLIT_INDEX);
let falsePositive3 = 0;

firstPart.forEach((email) => {
  if (!spamList.includes(email) && spamClassifier3.Is_Spam(email))
    falsePositive3++;
});

const newSpamList = [];

for (let i = 0; i < NEW_SPAM_AMOUNT; i++) {
  newSpamList.push(spamList[i]);
  spamClassifier3.Remove_Spam(spamList[SPAM_EMAILS_AMOUNT - 1 - i]);
}

while (newSpamList.length < SPAM_EMAILS_AMOUNT) {
  const randomIndex = Math.floor(Math.random() * SPLIT_INDEX);
  const randomEmail = firstPart[randomIndex];
  if (!newSpamList.includes(randomEmail)) {
    newSpamList.push(randomEmail);
    spamClassifier3.Add_Spam(randomEmail);
  }
}

lastPart.forEach((email) => {
  if (!newSpamList.includes(email) && spamClassifier3.Is_Spam(email))
    falsePositive3++;
});

console.log(`the amount of false positive in case 3 are : ${falsePositive3}`);
