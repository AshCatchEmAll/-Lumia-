import { VoteType } from "@prisma/client";
import { handleAnswerVote } from "./voteHelper";

export default async function handler(req, res) {
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  
  req.body["type"] = VoteType.LIKE;
  if (req.method === "POST") {
    const answer = await handleAnswerVote(req.body);
    
    res.status(200).json({ answer });
  }
}



