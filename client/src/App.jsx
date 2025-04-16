
// import React, { useState, useEffect } from 'react';
// import { ethers } from 'ethers';

// // Define ABI directly inside the component or import it from a separate file if needed
// const CrowdFundingABI = [
//   {
//     "inputs": [],
//     "name": "getCampaigns",
//     "outputs": [
//       {
//         "components": [
//           { "internalType": "address", "name": "owner", "type": "address" },
//           { "internalType": "string", "name": "title", "type": "string" },
//           { "internalType": "string", "name": "description", "type": "string" },
//           { "internalType": "uint256", "name": "target", "type": "uint256" },
//           { "internalType": "uint256", "name": "amountCollected", "type": "uint256" },
//           { "internalType": "uint256", "name": "deadline", "type": "uint256" },
//           { "internalType": "string", "name": "image", "type": "string" }
//         ],
//         "internalType": "struct CrowdFunding.Campaign[]",
//         "name": "",
//         "type": "tuple[]"
//       }
//     ],
//     "stateMutability": "view",
//     "type": "function"
//   }
// ];

// const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // Update to your deployed address
// const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
// const signer = new ethers.Wallet(
//   "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
//   provider
// );

// const App = () => {
//   const [campaigns, setCampaigns] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [contract, setContract] = useState(null);

//   useEffect(() => {
//     const loadContract = async () => {
//       const contract = new ethers.Contract(contractAddress, CrowdFundingABI, signer);
//       setContract(contract);
//     };
//     loadContract();
//   }, []);

//   const loadCampaigns = async () => {
//     if (!contract) return;
//     setLoading(true);
//     try {
//       const campaignsData = await contract.getCampaigns();
//       const campaignsFormatted = campaignsData.map((c) => ({
//         owner: c.owner,
//         title: c.title,
//         description: c.description,
//         target: ethers.formatEther(c.target),
//         amountCollected: ethers.formatEther(c.amountCollected),
//         deadline: new Date(Number(c.deadline) * 1000).toLocaleString(),
//         image: c.image
//       }));
//       setCampaigns(campaignsFormatted);
//     } catch (error) {
//       console.error("Error loading campaigns:", error);
//     }
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif' }}>
//       <h1>🌍 Web3 CrowdFunding Campaigns</h1>
//       <button onClick={loadCampaigns} disabled={loading}>
//         {loading ? '🔄 Loading Campaigns...' : '🔄 Load Campaigns'}
//       </button>
//       <div id="campaigns" style={{ marginTop: '2rem' }}>
//         {loading ? (
//           <p>Loading...</p>
//         ) : campaigns.length === 0 ? (
//           <p>No campaigns found.</p>
//         ) : (
//           campaigns.map((c, i) => (
//             <div key={i} className="campaign" style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
//               <h3>{c.title}</h3>
//               <p><strong>Owner:</strong> {c.owner}</p>
//               <p>{c.description}</p>
//               <p><strong>Target:</strong> {c.target} ETH</p>
//               <p><strong>Collected:</strong> {c.amountCollected} ETH</p>
//               <p><strong>Deadline:</strong> {c.deadline}</p>
//               <img src={c.image} alt="Campaign" style={{ maxWidth: '200px' }} />
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;



import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Sidebar, Navbar } from './components';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { Toaster } from 'react-hot-toast';
const App = () => {
  return (
    <div className="relative sm:-8 p-4 bg-[#13131a] min-h-screen flex flex-row">
      <div className="sm:flex hidden mr-10 relative">
        <Sidebar />
      </div>

      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/campaign-details/:id" element={<CampaignDetails />} />
        </Routes>
      </div>
      <Toaster />
    </div>
  )
}

export default App