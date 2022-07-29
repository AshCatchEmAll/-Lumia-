import { prisma } from "../../../prisma/db_init";

export default async function handler(req, res) {
  console.log(req.query);
  
  if (req.method === "GET") {
    const { id } = req.query || false;
    
    if (id) {
    
       const q =  await getQuestionByID(id);
       console.log("Length of questions: " + q.length);
       res.json({question:q});
    } else {
        const {  userId } = req.query;
       
        const q = await getQuestions(userId);
        console.log("Length of questions: " + q.length);
        res.json(q);
    }
  } else if (req.method === "POST") {
    const { content, userId,isDraft } = req.body;
    const q =  addQuestion(content,userId,isDraft);
    res.json(q);
  } else {
    res.status(405).send("Method Not Allowed");
  }
}

async function getQuestionByID(id) {
  try {
    return  await prisma.question.findFirst({
      where: {
        id: Number(id),

      },
      select:{
       
        id:true,
        content:true,
        createdAt:true,
        userId:true,
        isDraft:true,
        user:{
          select:{
            name:true,
            avatar:true,
          }
        },
       
        likes:true,
        dislikes:true,
      }
    });
    
  } catch (e) {
    throw new Error(e);
  }
}

async function getQuestions(userId) {
    try {
        return await  prisma.question
        .findMany({
          
            orderBy: [
                {
                  createdAt: 'desc',
                },
            ],
            take:30,
          where: {
            userId: userId,
            isDraft: false,
            
          },
          select:{
            votes:{
              where:{
                userId:userId
              }
            },
            id:true,
            content:true,
            createdAt:true,
            userId:true,
            isDraft:true,
            user:{
              select:{
                name:true,
                avatar:true,
              }
            },
           
            likes:true,
            dislikes:true,
          }
          
        })
      
      } catch (e) {
        throw new Error(e);
      }
}

async function addQuestion(content,userId,isDraft) {
    try {
        if(content.length===0 || content===undefined){
            throw new Error("Content is empty");
        }
        return await prisma.question
        .create({
          data: {
            content: content,
            userId: userId,
            isDraft: isDraft,
          },
        })
        
      } catch (e) {
        throw new Error(e);
      }
}


