import { prisma } from "../../../prisma/db_init";
import { createServer, createPubSub } from "@graphql-yoga/node";

export default async function handler(req, res) {
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  if (req.method === "GET") {
    const userId = req.query.userId;
     
    const count =  await resetUserNotificationCount(userId)
    res.status(200).json({ count });
  }
}


async function resetUserNotificationCount(uid){
    return await prisma.user.update({
        where: {
            uid: uid
        },
        data: {
            unreadNotifications: 0
        }
    });
    

 
}