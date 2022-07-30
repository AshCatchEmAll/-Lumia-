import { prisma } from "../../../prisma/db_init";
export default async function handler(req, res) {
  
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  if (req.method === "POST") {
    
    const answer = await saveAnswer(req.body);
    res.status(200).json({ answer});
  }else if(req.method=="GET"){
    const { questionId } = req.query || false;
    const { answerId } = req.query || false;
    const { userId } = req.query || false;
    
   
    if(answerId){
      const answers= await getSubAnswerByAnswerId(answerId,questionId,userId);
     
      res.status(200).json({ answers });
    }else{
      const answers = await getAnswerByQuestionId(questionId,userId);
      
      res.status(200).json({ answers });
    }
   
  }
 
}


async function getAnswerByQuestionId(questionId,userId){
  try {

    return await prisma.answer.findMany({
    
      orderBy: [
        {
          likes: 'desc',
        },
        {
          createdAt: 'desc',
        },
       
      ],
      take: 30,
      where: {
        questionId: Number(questionId),
        isRootAnswer:true,
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
        user:{
          select:{
            
            name:true,
            avatar:true,
          }
        },
        isDraft:true,
        isRootAnswer:true,
        parentAnswerId:true,
        questionId:true,
        likes:true,
        dislikes:true,
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function getSubAnswerByAnswerId(answerId,questionId,userId){
  try {
    return await prisma.answer.findMany({
     
      orderBy: [
        {
          likes: 'desc',
        },
        {
          createdAt: 'desc',
        },
       
      ],
      take: 30,
      where: {
        parentAnswerId: Number(answerId),
        isRootAnswer:false,
        questionId:Number(questionId)
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
        user:{
          select:{
            name:true,
            avatar:true,
          }
        },
        isDraft:true,
        isRootAnswer:true,
        parentAnswerId:true,
        questionId:true,
        
      }
    });
  } catch (e) {
    throw new Error(e);
  }
}

async function saveAnswer(body) {
  try {
    if (body.isRootAnswer === true) {
      return await prisma.answer.create({
        data: {
          content: body.content,
          questionId: Number(body.questionId),
          userId: body.userId,
          isDraft: body.isDraft,
          isRootAnswer: body.isRootAnswer,
        },
      });
    } else {
      return await prisma.answer.create({
        data: {
          content: body.content,
          questionId: Number(body.questionId),
          userId: body.userId,
          isDraft: body.isDraft,
          isRootAnswer: body.isRootAnswer,
          parentAnswerId: Number(body.parentAnswerId),
        },
      });
    }
  } catch (e) {
    throw new Error(e);
  }
}
