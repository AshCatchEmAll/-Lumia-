import { prisma } from "../../../prisma/db_init";
export default async function handler(req, res) {
  
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  if (req.method === "DELETE") {
    const answer = await deleteAnswer(req.body);
    res.status(200).json({ answer });
  }
}

async function deleteAnswer(body) {
  try {
    const answer = await getAnswerByID(body);
    if (answer && answer.id === body.answerId && answer.userId === body.userId) {
      return await prisma.answer.delete({
        where: {
          id: Number(body.answerId),
          
        },
      });
    }else{
        throw new Error("You are not authorized to delete this answer");
    }
  } catch (e) {
    
    throw new Error(e);
  }
}

async function getAnswerByID(body) {
  try {
    return await prisma.answer.findFirst({
      where: {
        id: Number(body.answerId),
      },
    });
  } catch (e) {
    
    throw new Error(e);
  }
}
