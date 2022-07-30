export default async function handler(req, res) {
  
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  if (req.method === "POST") {
    const user = await updateUserName(req.body);
    res.status(200).json({ user });
  }
}

async function updateUserName(body) {
  try {
    return await prisma.user.update({
      where: {
        uid: body.userId,
      },
      data: {
        name: body.name,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
