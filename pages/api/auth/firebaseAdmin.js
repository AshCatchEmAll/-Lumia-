import  admin from "firebase-admin";
import lumia from "./adminconfig.json";
const handler = async (req, res) => {
 

  
  try {
    const { cookies } = req.body;
    if(cookies.token===undefined || cookies.token===null){
      res.status(400).json({ uid: undefined, email: undefined, photoURL: undefined, displayName: undefined });
      return;
    }

    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(lumia),
      });
    }
    
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
