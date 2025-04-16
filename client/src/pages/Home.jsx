// import React, { useState, useEffect } from 'react'

// import { DisplayCampaigns } from '../components';
// import { useStateContext } from '../context'

// const Home = () => {
//   const [isLoading, setIsLoading] = useState(false);
//   const [campaigns, setCampaigns] = useState([]);

//   const { address, contract, getCampaigns } = useStateContext();

//   const fetchCampaigns = async () => {
//     setIsLoading(true);
//     const data = await getCampaigns();
//     setCampaigns(data);
//     setIsLoading(false);
//   }

//   useEffect(() => {
//     if(contract) fetchCampaigns();
//   }, [address, contract]);

//   return (
//     <DisplayCampaigns 
//       title="All Campaigns"
//       isLoading={isLoading}
//       campaigns={campaigns}
//     />
//   )
// }

// export default Home


import React, { useState, useEffect } from 'react';

import { DisplayCampaigns } from '../components';
import { useStateContext } from '../context';
import { campaignsData } from '../constants';




const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { address, contract } = useStateContext(); 


  const fetchCampaigns = async () => {
    setIsLoading(true);
  
    try {
      // Fetch campaigns from backend
      const response = await fetch('http://localhost:5000/campaigns');
      const backendData = await response.json();
      
      // Merge with local campaignsData
      const combinedCampaigns = [...campaignsData, ...backendData];
  
      // Update state
      setCampaigns(combinedCampaigns);
    } catch (error) {
      console.error('Failed to fetch backend campaigns:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (contract) fetchCampaigns();
  }, [address, contract]);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Home;
