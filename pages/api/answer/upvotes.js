import { VoteType } from "@prisma/client";
import { handleAnswerVote } from "./voteHelper";

export default async function handler(req, res) {
  
  
  req.body["type"] = VoteType.LIKE;
  if (req.method === "POST") {
    const answer = await handleAnswerVote(req.body);
    
    res.status(200).json({ answer });
  }
}



