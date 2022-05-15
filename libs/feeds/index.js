import { collection, addDoc, serverTimestamp } from "firebase/firestore";

import { auth, db } from "../../config/firebase";
import { getAnswer } from "../../config/axios";

// get all items

// create an item

export const createFeed = async ({ prompt, engineId }) => {
  try {
    const { photoURL, displayName, email, uid } = auth.currentUser;
    const { data } = await getAnswer({ prompt, engineId });
    // Add a new document with a generated id.
    await addDoc(collection(db, "feeds"), {
      creator: { photoURL, displayName, email, uid },
      createdAt: serverTimestamp(),
      prompt,
      answer: data.choices[0].text,
      totalLike: 0,
      whoLikes: [],
    });
    console.log("Created");
  } catch (error) {
    console.log(error);
  }
};
