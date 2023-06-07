import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { developmentChains, networkConfig } from "../helper-hardhat-config";
import { verify } from "../utils/verify";

export default async function ({
  getNamedAccounts,
  deployments,
}: HardhatRuntimeEnvironment) {
  const { deploy, log, get } = deployments;
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId as number;

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else ethUsdPriceFeedAddress = networkConfig[chainId].ethUsdPriceFeed;

  log("Deploying Fund Me Contract...");
  const args = [ethUsdPriceFeedAddress];

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args,
    log: true,
    waitConfirmations: networkConfig[chainId]?.blockConfirmation || 1,
  });

  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }
  log("FundMe Smart contract Deployed");
  log("-------------------------------------");
}

export const tags = ["all", "fundme"];
