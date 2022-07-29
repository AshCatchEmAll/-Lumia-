import { prisma } from "../../../prisma/db_init";

export const answerDraftType = "answer";
export const questionDraftType = "question";
export async function createDraft(body) {
  const { type } = body;
  try {
    const draft = await checkIfDraftExists(body);
    if (draft) {
      return null;
    }
    if (type === answerDraftType) {
      return await prisma.answerDraft.create({
        data: {
          answerId: Number(body.id),
          userId: body.userId,
        },
      });
    } else if (type === questionDraftType) {
      return await prisma.questionDraft.create({
        data: {
          questionId: Number(body.id),
          userId: body.userId,
        },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
}

async function checkIfDraftExists(body) {
  const { type } = body;
  try {
    if (type === answerDraftType) {
      return await prisma.answerDraft.findFirst({
        where: {
          answerId: Number(body.id),
          userId: body.userId,
        },
      });
    } else if (type === questionDraftType) {
      return await prisma.questionDraft.findFirst({
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

export async function deleteDraft(body) {
  const { type } = body;
  try {
    if (type === answerDraftType) {
      return await prisma.answerDraft.delete({
        where: {
          id: Number(body.id),
        },
      });
    } else if (type === questionDraftType) {
      return await prisma.questionDraft.delete({
        where: {
          id: Number(body.id),
        },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
}

export async function getDrafts(userId) {
  try {
    return await prisma.question.findMany({
      where: {
        userId: userId,
        isDraft: true,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}

export async function updateDraft(body) {
  const { type } = body;
  try {
    if (type === answerDraftType) {
      return await prisma.answer.update({
        where: {
          id: Number(body.id),
        },
        data: {
          answerId: Number(body.answerId),
          userId: body.userId,
        },
      });
    } else if (type === questionDraftType) {
      return await prisma.question.update({
        where: {
          id: Number(body.id),
         
        },
        data: {
            isDraft:body.isDraft,
          content: body.content,
        },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
}

function processDraftContent(draft) {
  if (draft.answer) {
    draft.content = draft.answer.content;
  } else if (draft.question) {
    draft.content = draft.question.content;
  }
}
