// const hre = require("hardhat");

// async function main() {
//   const [deployer] = await hre.ethers.getSigners();

//   console.log("Deploying contracts with account:", deployer.address);

//   const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
//   const crowdFunding = await CrowdFunding.deploy();

//   // Wait for the transaction to be mined
//   const tx = await crowdFunding.deployTransaction.wait();

//   console.log("CrowdFunding deployed to:", crowdFunding.address);
// }

// main().catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with account:", deployer.address);

  const CrowdFunding = await hre.ethers.getContractFactory("CrowdFunding");
  const crowdFunding = await CrowdFunding.deploy(); // Automatically waits for deployment in v6

  console.log("CrowdFunding deployed to:", crowdFunding.target); // use `.target` instead of `.address` in ethers v6
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
