// const { JsonRpcProvider } = require("ethers");
// const { Contract } = require("ethers");

// // Replace with your actual values
// const contractAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
// const contractABI = [
//   "function numberOfCampaigns() view returns (uint256)",
//   "function getCampaigns() view returns (tuple(address owner,string title,string description,uint256 target,uint256 deadline,uint256 amountCollected,string image,address[] donators,uint256[] donations)[])"
// ];

// // Connect to local blockchain (Hardhat)
// const provider = new JsonRpcProvider("http://127.0.0.1:8545/");

// async function isBlockchainEmpty() {
//   const contract = new Contract(contractAddress, contractABI, provider);

//   const totalCampaigns = await contract.numberOfCampaigns();
//   console.log("📊 Number of campaigns:", totalCampaigns.toString());

//   if (totalCampaigns.toString() === "0") {
//     console.log("✅ Blockchain is empty. No campaigns created.");
//   } else {
//     console.log("❗ Blockchain is NOT empty. Campaigns exist.");
//   }
// }

// isBlockchainEmpty().catch(console.error);



















// const { ethers } = require("ethers");
//  // Import ethers properly
// const { JsonRpcProvider, Wallet, Contract } = ethers; // You can also destructure from ethers, but `ethers` itself must be imported

// // Replace with your actual values
// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// const contractABI = [
//   "function numberOfCampaigns() view returns (uint256)",
//   "function getCampaigns() view returns (tuple(address owner,string title,string description,uint256 target,uint256 deadline,uint256 amountCollected,string image,address[] donators,uint256[] donations)[])",
//   "function createCampaign(address owner, string memory title, string memory description, uint256 target, uint256 deadline, string memory image) public returns (bool)"
// ];

// // Connect to local blockchain (Hardhat)
// const provider = new JsonRpcProvider("http://127.0.0.1:8545/");
// const signer = new Wallet("0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e", provider); // Add your private key here

// const contract = new Contract(contractAddress,contractABI, signer);

// // Function to check if the blockchain has campaigns
// async function isBlockchainEmpty() {
//   const totalCampaigns = await contract.numberOfCampaigns();
//   console.log("📊 Number of campaigns:", totalCampaigns.toString());

//   if (totalCampaigns.toString() === "0") {
//     console.log("✅ Blockchain is empty. No campaigns created.");
//   } else {
//     console.log("❗ Blockchain is NOT empty. Campaigns exist.");
//   }
// }

// // Function to create a campaign
// async function createCampaign() {
//   const title = "New Campaign";
//   const description = "This is a test campaign for crowdfunding.";
//   const target = ethers.utils.parseEther("10"); // 10 ETH target
//   const deadline = Math.floor(Date.now() / 1000) + 86400 * 30; // 30 days from now
//   const image = "https://example.com/campaign-image.png"; // Example image URL

//   console.log("📤 Creating campaign...");

//   try {
//     const tx = await contract.createCampaign(
//       signer.address, // Owner address (this will be the address of the signer)
//       title,
//       description,
//       target,
//       deadline,
//       image
//     );

//     console.log("⌛ Waiting for transaction to be mined...");
//     await tx.wait(); // Wait for the transaction to be mined

//     console.log("✅ Campaign created successfully!");
//   } catch (err) {
//     console.error("❌ Error creating campaign:", err);
//   }
// }

// // Function to fetch all campaigns from the blockchain
// async function getCampaigns() {
//   try {
//     const campaigns = await contract.getCampaigns();
//     console.log("📋 All Campaigns:", campaigns);

//     campaigns.forEach((campaign, index) => {
//       console.log(`Campaign ${index + 1}:`);
//       console.log("  Title:", campaign.title);
//       console.log("  Description:", campaign.description);
//       console.log("  Target:", ethers.utils.formatEther(campaign.target), "ETH");
//       console.log("  Collected:", ethers.utils.formatEther(campaign.amountCollected), "ETH");
//       console.log("  Deadline:", new Date(campaign.deadline * 1000).toLocaleString()); // Convert deadline to human-readable
//       console.log("  Image:", campaign.image);
//       console.log("  Owner:", campaign.owner);
//       console.log("  --- ");
//     });
//   } catch (err) {
//     console.error("❌ Error fetching campaigns:", err);
//   }
// }

// // Running the script
// async function run() {
//   await isBlockchainEmpty(); // Check if there are any campaigns
//   await createCampaign(); // Create a new campaign
//   await getCampaigns(); // Fetch all campaigns after creating a new one
// }

// run().catch(console.error);
















































import { readFile } from 'fs/promises';
import { ethers } from 'ethers';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load ABI JSON
const artifactPath = path.resolve(__dirname, './CrowdFunding.json');
const contractJson = JSON.parse(await readFile(artifactPath, 'utf8'));

// Setup provider and signer
const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
const signer = new ethers.Wallet(
  "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
  provider
);

// Setup contract
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const crowdfunding = new ethers.Contract(contractAddress, contractJson.abi, signer);

async function testCrowdFunding() {
  console.log("🔧 Testing CrowdFunding Contract...");

  const deadline = Math.floor(Date.now() / 1000) + 3600;

  const createTx = await crowdfunding.createCampaign(
    signer.address,
    "Save the Rainforest",
    "Help us protect the rainforest by funding our awareness campaign.",
    ethers.parseEther("1.0"),
    deadline,
    "https://example.com/image.jpg"
  );

  await createTx.wait();
  console.log("✅ Campaign created");

  const campaigns = await crowdfunding.getCampaigns();
  const latestCampaign = campaigns.at(-1);
  const campaignId = campaigns.length - 1;

  console.log("📦 Latest campaign:", latestCampaign);

  const donateTx = await crowdfunding.donateToCampaign(campaignId, {
    value: ethers.parseEther("0.1")
  });
  await donateTx.wait();
  console.log(`💰 Donated 0.1 ETH to campaign ID ${campaignId}`);

  const [donators, donations] = await crowdfunding.getDonators(campaignId);
  console.log("📋 Donators:");
  donators.forEach((addr, idx) => {
    console.log(`- ${addr} donated ${ethers.formatEther(donations[idx])} ETH`);
  });
}

testCrowdFunding().catch(console.error);
