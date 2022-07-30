export default async function handler(req, res) {
    
    if (req.method == "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    if (req.method === "POST") {
      const user = await createUser(req.body);
      res.status(200).json({ user });
    }
  }
  
  async function createUser(body){
    try {
      return await prisma.user.create({
        data: {
          uid: body.uid,
          name: body.name,
          email: body.email
        },
      });
    } catch (e) {
      throw new Error(e);
    }
  }