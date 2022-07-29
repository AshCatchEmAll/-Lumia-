import { prisma } from "../../../prisma/db_init";
import { NotificationType, VoteType } from "@prisma/client";
import { increaseUserUnreadNotification } from "../account/user";

export async function handleQuestionVote(body) {
  const questionVote = await findQuestionVote(body);
  if (questionVote) {
    body["questionVoteId"] = questionVote.id;
    if (questionVote.type == body["type"]) {
      return deleteQuestionVote(body);
    } else {
      return updateQuestionVote(body);
    }
  } else {
    const user = await sendQuestionLikedNotification(body)
    const vote = await createQuestionVote(body);
    vote["publish"] = true;
    vote["count"] = user.unreadNotifications;
    return vote;
  }
}

export async function findQuestionVote(body) {
  try {
    return await prisma.questionVotes.findFirst({
      where: {
        questionId: Number(body.questionId),
        userId: body.userId,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
async function sendQuestionLikedNotification(body) {
  try {
    console.log(body)
    const user =  increaseUserUnreadNotification(body)
    await prisma.notification.create({
      data: {
        userId: body.sendTo,
        type: NotificationType.Question,
        questionId: Number(body.questionId),
        title: "You got a new like on your question",
        content: body.content,
      },
    });
    return user;
  } catch (e) {
    throw new Error(e);
  }
}
async function createQuestionVote(body) {
  try {
    await prisma.questionVotes.create({
      data: {
        questionId: Number(body.questionId),
        userId: body.userId,
        type: body.type,
      },
    });
    if (body["type"] == VoteType.LIKE) {
      return await increaseQuestionUpvoteCount(body);
    } else if (body["type"] == VoteType.DISLIKE) {
      return await increaseQuestionDownvoteCount(body);
    }
  } catch (e) {
    throw new Error(e);
  }
}
async function deleteQuestionVote(body) {
  try {
    await prisma.questionVotes.delete({
      where: {
        id: Number(body.questionVoteId),
      },
    });
    if (body["type"] == VoteType.LIKE) {
      return await decreaseQuestionUpvoteCount(body);
    } else if (body["type"] == VoteType.DISLIKE) {
      return await decreseQuestionDownvoteCount(body);
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function updateQuestionVote(body) {
  try {
    await prisma.questionVotes.update({
      where: {
        id: Number(body.questionVoteId),
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
async function increaseQuestionUpvoteCount(body) {
  try {
    return await prisma.question.update({
      where: {
        id: Number(body.questionId),
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
async function increaseQuestionDownvoteCount(body) {
  try {
    return await prisma.question.update({
      where: {
        id: Number(body.questionId),
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
async function decreseQuestionDownvoteCount(body) {
  try {
    return await prisma.question.update({
      where: {
        id: Number(body.questionId),
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

async function decreaseQuestionUpvoteCount(body) {
  try {
    return await prisma.question.update({
      where: {
        id: Number(body.questionId),
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
    return await prisma.question.update({
      where: {
        id: Number(body.questionId),
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
    return await prisma.question.update({
      where: {
        id: Number(body.questionId),
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
