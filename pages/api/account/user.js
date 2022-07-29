export async function increaseUserUnreadNotification(body) {
  try {
   

    return await prisma.user.update({
      where: {
        uid: body.sendTo,
      },
      data: {
        unreadNotifications: {
          increment: 1,
        },
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
