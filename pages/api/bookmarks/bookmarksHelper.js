export const answerBookmark = "answerBookmark";
export const questionBookmark = "questionBookmark";

export async function getUserBookmarks(userId) {
  try {
    
      const answerBookmarks = await prisma.answerBookmark.findMany({
        where: {
          userId: userId,
        },
        select: {
          id: true,
          answerId: true,
          createdAt: true,
          answer: {
            select: {questionId:true,
              content: true,
            },
          },
        },
      });
      answerBookmarks.forEach((bookmark) => {
        processBookmarkContent(bookmark);
      });
     
   
      const questionBookmarks = await prisma.questionBookmark.findMany({
        where: {
          userId: userId,
        },
        take: 30,
        select: {
          id: true,
          questionId: true,
          createdAt: true,
          question: {
            select: {
              content: true,
            },
          },
        },
      });
      questionBookmarks.forEach((bookmark) => {
        processBookmarkContent(bookmark);
      });
      //sort by createdAt
      const bookmarks = [...answerBookmarks, ...questionBookmarks];
      bookmarks.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })

      return bookmarks;
     
      
  
  } catch (e) {
    throw new Error(e);
  }
}

export async function addBookmark(body) {
  const { type } = body;
  try {
    const bookmark = await checkIfBookmarkExists(body);
    if (bookmark) {
      return null;
    } else {
      if (type === answerBookmark) {
        return await prisma.answerBookmark.create({
          data: {
            answerId: Number(body.id),
            userId: body.userId,
          },
        });
      } else if (type === questionBookmark) {
        return await prisma.questionBookmark.create({
          data: {
            questionId: Number(body.id),
            userId: body.userId,
          },
        });
      }
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function checkIfBookmarkExists(body, type) {
  try {
    if (type === answerBookmark) {
      return await prisma.answerBookmark.findFirst({
        where: {
          answerId: Number(body.id),
          userId: body.userId,
        },
      });
    } else if (type === questionBookmark) {
      return await prisma.questionBookmark.findFirst({
        where: {
          questionId: Number(body.id),
          userId: body.userId,
        },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
}

export async function deleteBookmark(body){
  const { type } = body;
  try {
    if (type === answerBookmark) {
      return await prisma.answerBookmark.delete({
        where: {
          id: Number(body.id),
        },
      });
    } else if (type === questionBookmark) {
      return await prisma.questionBookmark.delete({
        where: {
          id: Number(body.id),
        },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
}


function processBookmarkContent(bookmark) {
  if (bookmark.answer) {
    bookmark.content = bookmark.answer.content;
  } else if (bookmark.question) {
    bookmark.content = bookmark.question.content;
  }
}
