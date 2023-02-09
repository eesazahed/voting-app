import Vote from "../models/Vote";
import alreadyVoted from "./alreadyVoted";

const vote = async (userid: number, option: number) => {
  const userAlreadyVoted: boolean = await alreadyVoted(userid);

  if (userAlreadyVoted) {
    return false;
  }

  if (option !== 0 && option !== 1) {
    return false;
  }

  await Vote.create({ userid: userid, option });

  return true;
};

export default vote;
