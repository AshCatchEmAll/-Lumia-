import { prisma } from "../../../prisma/db_init";
export default async function handler(req, res) {
  console.log(req.query);

  if (req.method === "DELETE") {
    const question = await deleteQuestion(req.body);
    res.status(200).json({ question });
  }
}

async function deleteQuestion(body) {
  try {
    const question = await getQuestionById(body);
    if (question && question.id === body.questionId && question.userId === body.userId) {
      return await prisma.question.delete({
        where: {
          id: Number(body.questionId),
          
        },
      });
    }else{
        throw new Error("You are not authorized to delete this answer");
    }
  } catch (e) {
    console.log("Error in  deleteQuestion: ", e);
    throw new Error(e);
  }
}

async function getQuestionById(body) {
  try {
    return await prisma.question.findFirst({
      where: {
        id: Number(body.questionId),
      },
    });
  } catch (e) {
    console.log("Error in  getQuestionById: ", e);
    throw new Error(e);
  }
}
