import {

  updateDraft,
} from "./draftsHelper";

export default async function handler(req, res) {
  
  if (req.method === "POST") {
    const draft = await updateDraft(req.body);

    res.status(200).json({ draft });
  }
}
