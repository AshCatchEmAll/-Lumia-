export default async function handler(req, res) {
  console.log(req.query);
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  if (req.method === "POST") {
    const user = await updateUserAvatar(req.body);
    res.status(200).json({ user });
  }
}

async function updateUserAvatar(body) {
  try {
    return await prisma.user.update({
      where: {
        uid: body.userId,
      },
      data: {
        avatar: body.avatar,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
}
