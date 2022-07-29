export default async function handler(req, res) {
  console.log(req.query);

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
