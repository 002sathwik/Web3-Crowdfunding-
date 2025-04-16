require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Create a new campaign
app.post("/campaigns", async (req, res) => {
  const { owner, title, description, target, deadline, image } = req.body;

  try {
    const newCampaign = await prisma.campaign.create({
      data: {
        owner,
        title,
        description,
        target: parseFloat(target),
        deadline: new Date(deadline),
        image,
      },
    });

    await prisma.donation.create({
      data: {
        address: owner,
        amount: 0,
        campaignId: newCampaign.id,
      },
    });

    res.status(201).json(newCampaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all campaigns
app.get("/campaigns", async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany({
      include: { donators: true },
    });
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get campaign by ID
app.get("/campaigns/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: parseInt(id) },
      include: { donators: true },
    });

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/campaigns/:id/donations", async (req, res) => {
  const { id } = req.params;

  try {
    const donations = await prisma.donation.findMany({
      where: { campaignId: parseInt(id) },
    });

    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add donation to a campaign
app.post("/campaigns/:id/donate", async (req, res) => {
  const { id } = req.params;
  const { address, amount } = req.body; // Get address and amount from body

  if (!address || !amount) {
    return res.status(400).json({ error: "Missing address or amount" });
  }

  try {
    // Create donation entry
    const donation = await prisma.donation.create({
      data: {
        address, // Store the address of the donor
        amount: parseFloat(amount), // Store the donation amount
        campaignId: parseInt(id), // Convert campaign ID to integer
      },
    });

    // Update campaign amount collected
    await prisma.campaign.update({
      where: { id: parseInt(id) }, // Ensure the campaign ID is an integer
      data: {
        amountCollected: {
          increment: parseFloat(amount), // Increment amount collected by the donation amount
        },
      },
    });

    res.status(200).json({ message: "Donation recorded", donation });
  } catch (err) {
    console.error("Error during donation:", err);
    res.status(500).json({ error: err.message });
  }
});


// Health check
app.get("/", (req, res) => {
  res.send("Crowdfunding API is running");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
