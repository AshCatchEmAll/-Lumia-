var admin = require("firebase-admin");

var serviceAccount = require("./lumia.json");

const handler = async (req, res) => {
  try {
    const { cookies } = req.body;
    if(cookies.token===undefined || cookies.token===null){
      res.status(400).json({ uid: undefined, email: undefined, photoURL: undefined, displayName: undefined });
      return;
    }

    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    }
    console.log("API called with cookies: ", cookies);
    const token = await admin.auth().verifyIdToken(cookies.token);
    const { uid, email, picture } = token;
    return res.status(200).json({ uid, email, picture });
  } catch (e) {
    return res
      .status(500)
      .json({ error: "Unexpected error.", message: e.message });
  }
 
};

export default handler;
