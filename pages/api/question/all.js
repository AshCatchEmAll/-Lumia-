import { prisma } from "../../../prisma/db_init";

export default async function handler(req, res) {
  console.log(req.query);

  if (req.method === "GET") {
    const { userId } = req.query;
    const { sort } = req.query;
    const q = await getQuestions(userId, sort);
    console.log("Length of questions: " + q.length);
    res.json(q);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

async function getQuestionByID(id) {
  try {
    return await prisma.question.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        userId: true,
        isDraft: true,
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },

        likes: true,
        dislikes: true,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function getQuestions(userId, sort) {
  console.log("Sort is: " + sort);
  const orderBy =
    sort === "newest" ? [{ createdAt: "desc" }] : [{ likes: "desc" }];

  try {
    return await prisma.question.findMany({
      orderBy: orderBy,
      take: 30,
      where: {
        isDraft: false,
      },
      select: {
        votes: {
          where: {
            userId: userId,
          },
        },
        id: true,
        content: true,
        createdAt: true,
        userId: true,
        isDraft: true,
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },

        likes: true,
        dislikes: true,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function addQuestion(content, userId, isDraft) {
  try {
    if (content.length === 0 || content === undefined) {
      throw new Error("Content is empty");
    }
    return await prisma.question.create({
      data: {
        content: content,
        userId: userId,
        isDraft: isDraft,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
