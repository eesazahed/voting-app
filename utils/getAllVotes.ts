import Vote from "../models/Vote";

const getAllVotes = async () => {
  try {
    const votes = await Vote.findAll({ raw: true });
    const option1Voters = votes.filter((vote: any) => vote.option === 0).length;
    const option2Voters = votes.filter((vote: any) => vote.option === 1).length;

    return { option1Voters, option2Voters };
  } catch {
    return null;
  }
};

export default getAllVotes;
