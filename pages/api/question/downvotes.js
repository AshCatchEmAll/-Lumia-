import { VoteType } from "@prisma/client";
import { prisma } from "../../../prisma/db_init";

import { handleQuestionVote } from "./voteHelper";
export default async function handler(req, res) {
  
  
  req.body["type"] = VoteType.DISLIKE;
  if (req.method === "POST") {
    const question = await handleQuestionVote(req.body);
    res.status(200).json({ question });
  }
}




