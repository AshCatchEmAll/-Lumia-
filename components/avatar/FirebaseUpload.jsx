import React, { useState } from "react";


import { getStorage, ref ,uploadBytes, getDownloadURL} from "firebase/storage";
import app from "../../config/initAuth";
const storage = getStorage(app);
export default function FirebaseUpload() {
  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");
   
  function handleChange(e) {
    if (e.target.files[0])
        setFile(e.target.files[0]);
  }

  async function handleUpload(e) {
    e.preventDefault();
    const path = `/images/${file.name}`;
    const fileRef = ref(storage,path)
    const task = await uploadBytes(fileRef,file)
   

    const downloadURL = await getDownloadURL(fileRef);
    setURL(downloadURL);
    setFile(null);
  }

  return (
    <div>
      <form onSubmit={handleUpload}>
        <input type="file" onChange={handleChange} />
        <button disabled={!file}>upload to firebase</button>
      </form>
      <img src={url} alt="" />
    </div>
  );
}
