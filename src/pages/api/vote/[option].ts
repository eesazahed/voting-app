import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import vote from "../../../../utils/vote";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const token = await getToken({ req });

    if (token && token.sub) {
      const id = String(req.query.option);

      if (id) {
        const success = await vote(parseInt(token.sub), parseInt(id));

        if (success) {
          return res.status(200).json({ message: "Success." });
        } else {
          return res
            .status(400)
            .json({ message: "There was an error in voting." });
        }
      } else {
        return res.status(400).json({ message: "Invalid parameter." });
      }
    } else {
      return res
        .status(401)
        .json({ message: "You must be logged in to vote." });
    }
  } else {
    return res.status(405).json({ message: "Method not allowed" });
  }
};

export default handler;
