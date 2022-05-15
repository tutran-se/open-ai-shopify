import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  limit,
  setDoc,
  getDoc,
  onSnapshot,
  increment,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
  where,
  deleteDoc,
} from "firebase/firestore";

import { auth, db } from "../../config/firebase";

import { useState, useEffect } from "react";
import { useAuth } from "../../components/context/AuthContextProvider";

// create an item

export const createNotification = async ({ item }) => {
  try {
    // check if creatorId === current userid
    const { photoURL, displayName, uid } = auth.currentUser;
    if (item.creator.uid === uid) {
      return null;
    }
    await addDoc(collection(db, "notifications"), {
      receiver: item.creator.uid,
      sender: {
        photoURL,
        displayName,
      },
      createdAt: serverTimestamp(),
    });

    console.log("Created");
  } catch (error) {
    console.log(error);
  }
};

// hooks get all feed items
export const useGetAllNotifications = () => {
  const [data, setData] = useState([]);
  const {
    userInfo: { uid },
  } = useAuth();

  useEffect(() => {
    const q = query(
      collection(db, "notifications"),
      orderBy("createdAt", "desc"),
      where("receiver", "==", uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        items.push(item);
      });
      console.log(items);
      setData(items);
    });
    return unsubscribe;
  }, [uid]);

  return { data };
};

// clear all notifications
export const clearAllNotifications = async ({ items }) => {
  try {
    for (const item of items) {
      await deleteDoc(doc(db, "notifications", item.id));
    }
    console.log("Finish Deleted.");
  } catch (error) {
    console.log(error);
  }
};
