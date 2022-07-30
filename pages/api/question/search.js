export default async function handler(req, res) {
  
  
  if (req.method === "POST") {
    //search question by content
    const question = await searchQuestion(req.body);

    res.status(200).json({ question });
  }
}

async function searchQuestion(body) {
  const { search } = body;

  return prisma.question.findMany({
    orderBy: [
      {
        likes: "desc",
      },
      {
        createdAt: "desc",
      },
    ],

    where: {
      content: {
        search: `"${search}"`,
      },
    },
    take: 30,
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
}
