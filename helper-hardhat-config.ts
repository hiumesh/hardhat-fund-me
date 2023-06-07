export const networkConfig: {
  [index: number]: {
    name: string;
    ethUsdPriceFeed: string;
    blockConfirmation: number;
  };
} = {
  11155111: {
    name: "sepolia",
    ethUsdPriceFeed: "0x694AA1769357215DE4FAC081bf1f309aDC325306",
    blockConfirmation: 6,
  },
};

export const developmentChains = ["hardhat", "localhost", "ganache"];

export const DECIMALS = 8;
export const INITIAL_ANSWER = 200000000000;
