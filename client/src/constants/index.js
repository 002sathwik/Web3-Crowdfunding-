import { createCampaign, dashboard, logout, payment, profile, withdraw } from '../assets';
import { ethers } from "ethers";

export const navlinks = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'campaign',
    imgUrl: createCampaign,
    link: '/create-campaign',
  },
  {
    name: 'payment',
    imgUrl: payment,
    link: '/',
    disabled: true,
  },
  {
    name: 'withdraw',
    imgUrl: withdraw,
    link: '/',
    disabled: true,
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
    disabled: true,
  },
];



export const campaignsData = [
  // {
  //   campaignId: 0,
  //   owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  //   title: "Save the Rainforest",
  //   description: "Help us protect the rainforest by funding our awareness campaign.",
  //   target: ethers.utils.parseEther("1.0"),
  //   deadline: 1744807001, 
  //   amountCollected: ethers.utils.parseEther("0.1"),
  //   image: "https://treesforall.nl/app/uploads/2022/03/Bos-Nederland-Epe-e1719389547661.jpg",
  //   donators: [],
  //   donations: []
  // },
  // {
  //   campaignId: 1,
  //   owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  //   title: "Test1",
  //   description: "awareness campaign.",
  //   target: ethers.utils.parseEther("0.0002"),
  //   deadline: 1744807037,
  //   amountCollected: ethers.utils.parseEther("0.1"),
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmN_W7WAtfj7enGg6WVcXa9Lt3hmPKTzRBDQ&s",
  //   donators: [],
  //   donations: []
  // },
  // {
  //   campaignId: 2,
  //   owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  //   title: "Test2",
  //   description: "Test2 description",
  //   target: ethers.utils.parseEther("0.0002"),
  //   deadline: 1744807059, 
  //   amountCollected: ethers.utils.parseEther("0.1"),
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmN_W7WAtfj7enGg6WVcXa9Lt3hmPKTzRBDQ&s",
  //   donators: [],
  //   donations: []
  // },
  // {
  //   campaignId: 3,
  //   owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  //   title: "Test3",
  //   description: "Test3 description",
  //   target: ethers.utils.parseEther("0.0002"),
  //   deadline: 1744807077, 
  //   amountCollected: ethers.utils.parseEther("0.1"),
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmN_W7WAtfj7enGg6WVcXa9Lt3hmPKTzRBDQ&s",
  //   donators: [],
  //   donations: []
  // },
  // {
  //   campaignId: 4,
  //   owner: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
  //   title: "Test5",
  //   description: "Test5 description",
  //   target: ethers.utils.parseEther("0.0002"),
  //   deadline: 1744807098, 
  //   amountCollected: ethers.utils.parseEther("0.1"),
  //   image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmN_W7WAtfj7enGg6WVcXa9Lt3hmPKTzRBDQ&s",
  //   donators: [],
  //   donations: []
  // }
];
