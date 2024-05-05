
# SpamClassificator

## Table of content

- [SpamClassificator](#spamclassificator)
  * [Overview](#overview)
    + [Email Spamming](#email-spamming)
    + [Probabilistic Data Structures](#probabilistic-data-structures)
    + [Bloom Filtering](#bloom-filtering)
    + [Counting Bloom Filter](#counting-bloom-filter)
    + [Skip List](#skip-list)
  * [Description](#description)
  * [Usage](#usage)
    + [Prerequisites](#prerequisites)
    + [Running the Project](#running-the-project)
      - [Clone the repository:](#clone-the-repository-)
      - [Navigate to the SpamClassificator folder:](#navigate-to-the-spamclassificator-folder-)
      - [Run the project:](#run-the-project-)
  * [Implementation](#implementation)
    + [common.js](#commonjs)
    + [BloomFilter.js](#bloomfilterjs)
    + [CountingBloomFilter.js](#countingbloomfilterjs)
    + [SkipList.js](#skiplistjs)
      - [Node class:](#node-class-)
      - [SkipList class:](#skiplist-class-)
      - [SpamFilter class:](#spamfilter-class-)
    + [main.js](#mainjs)
  * [License](#license)



## Overview

### Email Spamming
Email spamming refers to the practice of sending unsolicited and often unwanted emails in bulk to a large number of recipients. These spam emails typically contain advertisements, phishing attempts, malware, or other malicious content. Spamming not only consumes network bandwidth and storage but also poses security risks to users, as it can lead to identity theft, financial fraud, and malware infections. Spam filtering systems are essential for effectively managing email inboxes and protecting users from the nuisance and dangers associated with spam.

### Probabilistic Data Structures
Probabilistic data structures are a class of data structures designed to provide approximate answers to queries with a certain probability of error. Unlike traditional data structures that offer precise results but may consume significant memory and processing resources, probabilistic data structures trade accuracy for efficiency by using randomization techniques. Examples of probabilistic data structures include Bloom filters, Count-Min sketches, and skip lists. These structures find applications in various fields, including network traffic analysis, database systems, and, as in this project, spam filtering, where they enable fast and memory-efficient detection of spam emails while tolerating a small probability of misclassification.

### Bloom Filtering
Bloom filters are probabilistic data structures used for membership testing in a set. They offer efficient and memory-conscious solutions for determining whether an element is likely present in a set, with a controlled probability of false positives. Bloom filters achieve this by using a bit array and multiple hash functions to represent and query set membership, making them ideal for quickly identifying potential spam email addresses.

### Counting Bloom Filter
A Counting Bloom Filter is a variant of the traditional Bloom filter that allows for the counting of elements rather than just testing for membership. By using a larger array with counters instead of binary values, Counting Bloom Filters can track the frequency of elements in a set, enabling more nuanced filtering capabilities. This feature makes Counting Bloom Filters suitable for applications where the frequency of occurrence is essential, such as tracking the occurrence of spam email addresses.

### Skip List
Skip lists are probabilistic data structures that provide a balanced compromise between the efficiency of linked lists and the search capabilities of binary search trees. They consist of multiple layers of linked lists, each with progressively fewer elements and faster traversal speeds. Skip lists allow for efficient insertion, deletion, and search operations, making them well-suited for maintaining and querying the spam address list in the filtering system with logarithmic time complexity.
## Description
This is a project designed to combat email spam by leveraging probabilistic data structures such as Bloom Filtering, Counting Bloom Filter, and Skip List. These data structures enable efficient classification of spam emails, minimizing false positives while providing fast and memory-conscious filtering capabilities. The system aims to enhance email management by accurately identifying and filtering out unwanted spam messages, thereby improving users' cybersecurity and inbox organization.

## Usage

### Prerequisites
Before running the project, ensure you have the following installed:

[Node.js](https://nodejs.org/) (includes npm)

### Running the Project

#### Clone the repository:

```bash
git clone https://github.com/stav1236/SpamClassificator.git
```

#### Navigate to the SpamClassificator folder:

```bash
cd SpamClassificator
```

#### Run the project:

```bash
node main.js
```

The results of the program will appear in the console

## Implementation

To realize the email classification capabilities, we employ various data structures, each tailored to efficiently handle the tasks of adding, checking, and optionally removing email addresses from the spam list. Here's how each action is implemented using different data structures.

### common.js

This file serves as a utility module containing common functions and constants used throughout the Spam Filtering System implementation.

`MAX_SPAM_AMOUNT`: This constant defines the maximum allowed number of entries in the spam list. It is set to 100 to adhere to project requirements.

`hashAddress(address, seed, size)`: This function generates a hash value for the given email address using a custom hash function. It takes three parameters:
   - *`address`*: The email address to be hashed.
   - *`seed`*: A seed value used to modify the hashing process, ensuring uniqueness.
   - *`size`*: The size of the hash table or data structure where the address will be stored.

`hashFunction(input)`: This helper function implements a basic hash function to generate hash values for input strings. It uses the djb2 algorithm, a simple but effective hash function commonly used in hash tables. The function iterates through each character of the input string, updating a hash value based on the ASCII value of the character. It returns the computed hash value.

`calculateNumHashes(size)`: This function calculates the number of hash functions needed for a Bloom filter based on the desired size of the filter. It uses the formula `ceil((size / 100) * log(2))` to determine the optimal number of hash functions for a given filter size, ensuring efficient performance while minimizing false positives.

`generateEmailAddress()`: This function generates a random email address for testing purposes. It randomly selects a username consisting of alphanumeric characters and appends it to a randomly chosen domain from a predefined list (e.g., gmail.com, yahoo.com). The generated email address is returned as a string.

The functions and constants defined in this file are essential for various aspects of the Spam Filtering System, including hash-based data structure operations and email address generation for testing and evaluation purposes.

### BloomFilter.js

This file implements the functionality of a Bloom filter data structure for the Spam Filtering System.

`constructor(size)`: Initializes a new Bloom filter with the specified size. It sets the initial item count to 0, creates a bit array of the given size, and calculates the number of hash functions needed based on the size.

`Add_Spam(address)`: Adds the given address to the Bloom filter if the maximum spam item count has not been reached. It hashes the address using multiple hash functions and sets the corresponding bits in the bit array.

`Is_Spam(address)`: Checks if the given address is likely present in the Bloom filter. It hashes the address using multiple hash functions and checks if all corresponding bits in the bit array are set. If any bit is not set, the address is considered not present in the filter.

`hashAddress(address, seed)`: Computes the hash position of the address using a hash function with the specified seed value.
`decItemsCount()`: Decrements the item count of the Bloom filter. This function is used when an address is removed from the filter (optional feature not implemented in this file).


### CountingBloomFilter.js

This file implements the functionality of a Counting Bloom filter data structure for the Spam Filtering System.

`constructor(size)`: Initializes a new Counting Bloom filter with the specified size. It sets the initial item count to 0, creates a count array of the given size (initialized to zero), and calculates the number of hash functions needed based on the size.

`Add_Spam(address)`: Adds the given address to the Counting Bloom filter if the maximum spam item count has not been reached. It hashes the address using multiple hash functions and increments the corresponding counters in the count array.

`Remove_Spam(address)`: Removes the given address from the Counting Bloom filter if it exists. It first checks if the address is present in the filter using the Is_Spam method. If found, it decrements the corresponding counters in the count array.

`Is_Spam(address)`: Checks if the given address is likely present in the Counting Bloom filter. It hashes the address using multiple hash functions and checks if all corresponding counters in the count array are greater than zero. If any counter is zero or less, the address is considered not present in the filter.

`hashAddress(address, seed)`: Computes the hash position of the address using a hash function with the specified seed value.

### SkipList.js

This file implements the functionality of a Skip List data structure for the Spam Filtering System.

#### Node class: 
Represents a node in the Skip List, containing an address and an array of references to the next nodes at different levels.

#### SkipList class:
Implements the Skip List data structure for efficiently storing and searching email addresses in the spam list.

`constructor(size)`: Initializes a new Skip List with the specified size, which defaults to the maximum spam item count. It initializes the head node and sets the maximum level of the Skip List based on the size.

`randomLevel()`: Generates a random level for a new node in the Skip List based on a probability distribution.

`insert(address)`: Inserts the given address into the Skip List in sorted order. It traverses the list to find the appropriate position for insertion and adjusts the node references accordingly to maintain the list's structure.

`search(address)`: Searches for the given address in the Skip List. It traverses the list to locate the address and returns true if found, indicating that the address is present in the spam list.

#### SpamFilter class:
Implements the spam filtering functionality using the Skip List data structure.

`constructor()`: Initializes a new Spam Filter instance with an empty Skip List to store spam addresses and sets the initial spam count to zero.

`Add_Spam(address)`: Adds the given address to the Skip List if the spam count is below the maximum spam item count. It inserts the address into the Skip List and increments the spam count.

`Is_Spam(address)`: Checks if the given address is present in the Skip List by searching for it. It returns true if the address is found, indicating that it is classified as spam.

### main.js
This file serves as the core component for evaluating the Spam Filtering System's functionality, utilizing various data structures to classify emails as spam. Let's refine the description to enhance clarity and readability:

**Variables**:

`DATA_SIZE`: Represents the sample size of email addresses for experimentation.

`SPAM_EMAILS_AMOUNT`: Indicates the number of randomly selected emails considered as spam from the sample.

`TEST_SET_SIZE`: Denotes the number of emails checked as spam to verify true positives (TP).

`SPLIT_INDEX`: A buffer value used to split the dataset for testing.

`NEW_SPAM_AMOUNT`: Specifies the number of emails re-selected as spam after buffering the dataset.
Testing Procedure:

**Part 1: BloomFilter Evaluation**

- Initially, generate a dataset of DATA_SIZE email addresses.
- Randomly select SPAM_EMAILS_AMOUNT addresses from the dataset, marking them as spam.
- Utilize the BloomFilter to validate the project's functionality.
- Add all spam addresses to the filter and select a subset of size TEST_SET_SIZE for classification as true positives (TP).
- Verify that the selected subset is correctly classified as spam.
- Assess the false positive (FP) rate by examining the classification of the entire dataset, ensuring accuracy.

**Part 2: SkipList Evaluation**

- Similar to Part 1, utilize the SkipList data structure to assess the project's functionality.
- Add all spam addresses to the SkipList and select a subset for TP classification.
- Verify the correctness of TP classification.
- Evaluate the FP rate by analyzing the classification of the entire dataset.

**Part 3: CountingBloomFilter Evaluation**

- Employ the CountingBloomFilter for project functionality evaluation.
- Add all spam addresses to the filter and select a subset for TP verification.
- Assess FP rate by dividing the dataset into two parts at the SPLIT_INDEX.
- Initially, check the first part against the initially marked spam emails (SPAM_EMAILS_AMOUNT) to calculate FP.
- Subsequently, randomly select NEW_SPAM_AMOUNT new emails from the dataset to replace the original spam set.
- Evaluate the classification of the second part of the dataset for FP determination.

## License

This project is licensed under the [MIT](https://choosealicense.com/licenses/mit/) License.

