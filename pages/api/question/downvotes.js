import { VoteType } from "@prisma/client";
import { prisma } from "../../../prisma/db_init";

import { handleQuestionVote } from "./voteHelper";
export default async function handler(req, res) {
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  console.log(req.query);
  req.body["type"] = VoteType.DISLIKE;
  if (req.method === "POST") {
    const question = await handleQuestionVote(req.body);
    res.status(200).json({ question });
  }
}




