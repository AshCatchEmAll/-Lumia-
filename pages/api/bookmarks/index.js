
import {
  addBookmark,
  deleteBookmark,
  getUserBookmarks,
} from "./bookmarksHelper";
export default async function handler(req, res) {
  console.log(req.query);

  if (req.method === "POST") {
    const bookmark = await addBookmark(req.body);
    if (bookmark === null) {
      res.status(400).json({ message: "Bookmark already exists" });
    } else {
      res.status(200).json({ bookmark });
    }
  } else if (req.method == "GET") {
    const { userId } = req.query || false;
    const { type } = req.query || false;
    const bookmarks = await getUserBookmarks(userId, type);
    res.status(200).json({ bookmarks });
  } else if (req.method == "DELETE") {
    try{
      const bookmark = await deleteBookmark(req.body);
      console.log("Bookmark deleted : ", bookmark);
      res.status(200).json({ bookmark });
    }catch(e){
      console.log(e);
      res.status(400).json({ message: "Something went wrong" });
    }
   
  }
}