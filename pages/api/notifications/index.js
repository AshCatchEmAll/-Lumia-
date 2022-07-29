import { prisma } from "../../../prisma/db_init";
import { createServer, createPubSub } from "@graphql-yoga/node";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const userId = req.query.userId;
      console.log("Its here")
    const count =  await getUserNotificationCount(userId)
    res.status(200).json({ count });
  }else if(req.method === "DELETE"){
    const id = req.body.id;
    await deleteNotification(id);
    res.status(200).json({message:"Deleted succesfully"});
  }
}

async function deleteNotification(id){
  return await prisma.notification.delete({
    where: {
      id: id
    }
  });
}
async function getUserNotificationCount(uid){
  const user = await prisma.user.findFirst({
    where: {
      uid: uid
    }
  });
  return user.unreadNotifications;
}