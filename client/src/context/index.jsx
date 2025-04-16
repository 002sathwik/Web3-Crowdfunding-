import React, { useContext, createContext, useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  const address = useAddress();
  const connect = useMetamask();

  const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  const abi = [
    {
      inputs: [
        { internalType: "address", name: "_owner", type: "address" },
        { internalType: "string", name: "_title", type: "string" },
        { internalType: "string", name: "_description", type: "string" },
        { internalType: "uint256", name: "_target", type: "uint256" },
        { internalType: "uint256", name: "_deadline", type: "uint256" },
        { internalType: "string", name: "_image", type: "string" },
      ],
      name: "createCampaign",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [],
      name: "getCampaigns",
      outputs: [
        {
          components: [
            {
              internalType: "address",
              name: "owner",
              type: "address",
            },
            {
              internalType: "string",
              name: "title",
              type: "string",
            },
            {
              internalType: "string",
              name: "description",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "target",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "deadline",
              type: "uint256",
            },
            {
              internalType: "uint256",
              name: "amountCollected",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "image",
              type: "string",
            },
            {
              internalType: "address[]",
              name: "donators",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "donations",
              type: "uint256[]",
            },
          ],
          internalType: "struct CrowdFunding.Campaign[]",
          name: "",
          type: "tuple[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "donateToCampaign",
      outputs: [],
      stateMutability: "payable",
      type: "function",
    },
    {
      inputs: [{ internalType: "uint256", name: "_id", type: "uint256" }],
      name: "getDonators",
      outputs: [
        {
          internalType: "address[]",
          name: "",
          type: "address[]",
        },
        {
          internalType: "uint256[]",
          name: "",
          type: "uint256[]",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ];

  // Initialize the contract and provider
  useEffect(() => {
    if (window.ethereum) {
      const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(tempProvider);
      const tempSigner = tempProvider.getSigner();
      setSigner(tempSigner);

      const tempContract = new ethers.Contract(
        contractAddress,
        abi,
        tempSigner
      );
      setContract(tempContract);
    } else {
      console.log("Ethereum provider not detected. Please install MetaMask.");
    }
  }, []);

  // Publish a new campaign
  const publishCampaign = async (form) => {
    if (!contract || !signer) return;

    try {
      const tx = await contract.createCampaign(
        address,
        form.title,
        form.description,
        ethers.utils.parseEther(form.target), // Convert target to wei
        Math.floor(new Date(form.deadline).getTime() / 1000), // Convert to UNIX timestamp
        form.image
      );
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Campaign created successfully!", tx);
    } catch (error) {
      console.error("Error creating campaign:", error);
    }
  };

  // Fetch all campaigns
  const getCampaigns = async () => {
    if (!contract) return [];

    try {
      const campaigns = await contract.getCampaigns();
      return campaigns.map((campaign, i) => ({
        owner: campaign.owner,
        title: campaign.title,
        description: campaign.description,
        target: ethers.utils.formatEther(campaign.target),
        amountCollected: ethers.utils.formatEther(campaign.amountCollected),
        deadline: new Date(
          campaign.deadline.toNumber() * 1000
        ).toLocaleString(),
        image: campaign.image,
        pId: i,
      }));
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      return [];
    }
  };

  const donate = async (pId, amount) => {
    if (!contract || !signer) return;
    
    // Validate donation amount
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      console.error("Invalid donation amount →", { pId, amount });
      return;
    }
  
    try {
      // Convert to BigNumber (Wei)
      const parsedAmount = ethers.utils.parseEther(amount.toString());
  
      const tx = await contract.donateToCampaign(pId, {
        value: parsedAmount,
      });
  
      await tx.wait(); // Wait for the transaction to be mined
      console.log("Donation successful!", tx);
    } catch (error) {
      console.error("Error donating to campaign:", error);
    }
  };
  
  
  
  

  // Get donations for a specific campaign
  const getDonations = async (pId) => {
    if (!contract) return [];

    try {
      const campaigns = await contract.getCampaigns();
      if (pId >= campaigns.length) {
        console.error("Invalid pId:", pId);
        return [];
      }
    
      const donators = await contract.getDonators(pId);
      return donators.map((donator, i) => ({
        donator,
        donation: donators[1][i],
      }));
    } catch (error) {
      console.error("Error fetching donations:", error);
      return [];
    }
    
  };
  

  return (
    <StateContext.Provider
      value={{
        address,
        contract,
        connect,
        createCampaign: publishCampaign,
        getCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
