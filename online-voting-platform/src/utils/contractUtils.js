import { ethers } from 'ethers';
import VotingContractABI from './VotingContract.json';  // Replace with your actual ABI

const provider = new ethers.providers.JsonRpcProvider('YOUR_INFURA_URL');
const signer = new ethers.Wallet('YOUR_PRIVATE_KEY', provider);
const contract = new ethers.Contract('YOUR_CONTRACT_ADDRESS', VotingContractABI, signer);

export const registerUser = async (name, email) => {
    const tx = await contract.registerUser(name, email);
    await tx.wait();
};

export const getBallots = async () => {
    return await contract.getBallots();
};

export const castVote = async (ballotId) => {
    const tx = await contract.castVote(ballotId);
    await tx.wait();
};

export const createCampaign = async (title, description) => {
    const tx = await contract.createCampaign(title, description);
    await tx.wait();
};
