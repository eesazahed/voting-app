import Vote from "../models/Vote";

const alreadyVoted = async (userid: number) => {
  const exists: boolean = !!(await Vote.findOne({ where: { userid: userid } }));

  if (exists) {
    return true;
  } else {
    return false;
  }
};

export default alreadyVoted;
