import { network } from "hardhat";
import { HardhatRuntimeEnvironment } from "hardhat/types";

import { developmentChains, networkConfig } from "../helper-hardhat-config";

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

  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: [ethUsdPriceFeedAddress],
    log: true,
  });

  log("FundMe Smart contract Deployed");
  log("-------------------------------------");
}

export const tags = ["all", "fundme"];
