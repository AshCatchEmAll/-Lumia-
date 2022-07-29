import { prisma } from "../../../prisma/db_init";
import { VoteType } from "@prisma/client";
import { handleQuestionVote } from "./voteHelper";
export default async function handler(req, res) {
  console.log(req.query);
  req.body["type"] = VoteType.LIKE;
  if (req.method === "POST") {
    const question = await handleQuestionVote(req.body);
    
    res.status(200).json({ question });
  }
}

