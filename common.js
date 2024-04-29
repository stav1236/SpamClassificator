export const MAX_SPAM_AMOUNT = 100;

export const hashAddress = (address, seed, size) => {
  const hashedAddress = hashFunction(address + seed.toString());
  return Math.abs(hashedAddress) % size;
};

const hashFunction = (input) => {
  let hash = 0;
  if (input.length === 0) return hash;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32-bit integer
  }
  return hash;
};

export const calculateNumHashes = (size) => {
  return Math.ceil((size / 100) * Math.log(2));
};
