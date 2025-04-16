
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy();

  console.log("CrowdFunding deployed to:", crowdFunding.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
