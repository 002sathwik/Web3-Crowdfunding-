
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

async function showAllCampaigns() {
  const campaigns = await crowdfunding.getCampaigns();
  console.log(`📊 Total campaigns: ${campaigns.length}`);

  campaigns.forEach((c, i) => {
    console.log(`\n🆔 Campaign ID: ${i}`);
    console.log(`👤 Owner: ${c.owner}`);
    console.log(`📌 Title: ${c.title}`);
    console.log(`📝 Description: ${c.description}`);
    console.log(`🎯 Target: ${ethers.formatEther(c.target)} ETH`);
    console.log(`🕒 Deadline: ${new Date(Number(c.deadline) * 1000).toLocaleString()}`);
    console.log(`💰 Amount Collected: ${ethers.formatEther(c.amountCollected)} ETH`);
    console.log(`🖼️ Image: ${c.image}`);
  });
}


async function testCrowdFunding() {
  console.log("🔧 Testing CrowdFunding Contract...");

  const deadline = Math.floor(Date.now() / 1000) + 3600;

  const createTx = await crowdfunding.createCampaign(
    signer.address,
    "Test5",
    "Test5 description",
    ethers.parseEther("0.0002"),
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

  await showAllCampaigns();
}

testCrowdFunding().catch(console.error);















