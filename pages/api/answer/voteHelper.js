import { prisma } from "../../../prisma/db_init";
import { NotificationType, VoteType } from "@prisma/client";
import { increaseUserUnreadNotification } from "../account/user";

export async function handleAnswerVote(body) {
  const answerVote = await findAnswerVote(body);
  if (answerVote) {
    body["answerVoteId"] = answerVote.id;
    if (answerVote.type == body["type"]) {
      return deleteAnswerVote(body);
    } else {
      return updateAnswerVote(body);
    }
  } else {
    const user = await sendAnswerLikedNotification(body);
    const vote = await createAnswerVote(body);
    vote["publish"] = true;
    vote["count"] = user.unreadNotifications;
    return vote;
  }
}

export async function findAnswerVote(body) {
  try {
    return await prisma.answerVotes.findFirst({
      where: {
        answerId: Number(body.answerId),
        userId: body.userId,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
async function sendAnswerLikedNotification(body) {
  try {
    const user = await increaseUserUnreadNotification(body)
     await prisma.notification.create({
      data: {
        userId: body.sendTo,
        type: NotificationType.Answer,
       
        title: "You got a new like on your answer",
        content: body.content,
        questionId: Number(body.questionId),
      },
    });
    return user;
  } catch (e) {
    console.log("Error in mutation : ", e);
    throw new Error(e);
  }
}


async function createAnswerVote(body) {
  try {
    console.log("API CALLED WITH *USER : ", body);
    await prisma.answerVotes.create({
      data: {
        answerId: Number(body.answerId),
        userId: body.userId,
        type: body.type,
      },
    });
    if (body["type"] == VoteType.LIKE) {
      return await increaseAnswerUpvoteCount(body);
    } else if (body["type"] == VoteType.DISLIKE) {
      return await increaseAnswerDownvoteCount(body);
    }
  } catch (e) {
    throw new Error(e);
  }
}
async function deleteAnswerVote(body) {
  try {
    await prisma.answerVotes.delete({
      where: {
        id: Number(body.answerVoteId),
      },
    });
    if (body["type"] == VoteType.LIKE) {
      return await decreaseAnswerUpvoteCount(body);
    } else if (body["type"] == VoteType.DISLIKE) {
      return await decreseAnswerDownvoteCount(body);
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function updateAnswerVote(body) {
  try {
    await prisma.answerVotes.update({
      where: {
        id: Number(body.answerVoteId),
      },
      data: {
        type: body.type,
      },
    });

    if (body["type"] == VoteType.LIKE) {
      return await decreaseDownvoteIncreaseUpvote(body);
    } else if (body["type"] == VoteType.DISLIKE) {
      return await decreaseUpvoteIncreaseDownvote(body);
    }
  } catch (e) {
    throw new Error(e);
  }
}
async function increaseAnswerUpvoteCount(body) {
  try {
    return await prisma.answer.update({
      where: {
        id: Number(body.answerId),
      },
      data: {
        likes: {
          increment: 1,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
async function increaseAnswerDownvoteCount(body) {
  try {
    return await prisma.answer.update({
      where: {
        id: Number(body.answerId),
      },
      data: {
        dislikes: {
          increment: 1,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
async function decreseAnswerDownvoteCount(body) {
  try {
    return await prisma.answer.update({
      where: {
        id: Number(body.answerId),
      },
      data: {
        dislikes: {
          decrement: 1,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function decreaseAnswerUpvoteCount(body) {
  try {
    return await prisma.answer.update({
      where: {
        id: Number(body.answerId),
      },
      data: {
        likes: {
          decrement: 1,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
async function decreaseDownvoteIncreaseUpvote(body) {
  try {
    return await prisma.answer.update({
      where: {
        id: Number(body.answerId),
      },
      data: {
        dislikes: {
          decrement: 1,
        },
        likes: {
          increment: 1,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function decreaseUpvoteIncreaseDownvote(body) {
  try {
    return await prisma.answer.update({
      where: {
        id: Number(body.answerId),
      },
      data: {
        likes: {
          decrement: 1,
        },
        dislikes: {
          increment: 1,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
