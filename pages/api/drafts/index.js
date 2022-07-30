
import { getDrafts, deleteDraft, createDraft } from "./draftsHelper";

export default async function handler(req, res) {
  if (req.method == "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  if (req.method === "POST") {
    const draft = await createDraft(req.body);
    if (draft === null) {
      res.status(400).json({ message: "Draft already exists" });
    } else {
      res.status(200).json({ draft });
    }
  } else if (req.method == "GET") {
    const { userId } = req.query || false;

    const drafts = await getDrafts(userId);
    res.status(200).json({ drafts });
  } else if (req.method == "DELETE") {
    try {
      const draft = await deleteDraft(req.body);
      
      res.status(200).json({ draft });
    } catch (e) {
      
      res.status(400).json({ message: "Something went wrong" });
    }
  }
}
