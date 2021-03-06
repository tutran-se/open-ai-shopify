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
} from "firebase/firestore";

import { auth, db } from "../../config/firebase";
import { getAnswer } from "../../config/axios";
import { useState, useEffect } from "react";
import { createNotification } from "../notifications";
import { useAuth } from "../../components/context/AuthContextProvider";

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
      engineId,
      totalLike: 0,
      whoLikes: [],
    });

    const docRef = doc(db, "appInfo", "totalFeedsCount");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      await updateDoc(docRef, {
        total: increment(1),
      });
    } else {
      await setDoc(docRef, {
        total: 1,
      });
    }

    console.log("Created");
  } catch (error) {
    console.log(error);
  }
};

// hooks get all feed items
export const useGetResultLists = ({ pageSize }) => {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const { userInfo, setUserInfo } = useAuth();
  const getTotalCount = async () => {
    try {
      const docRef = doc(db, "appInfo", "totalFeedsCount");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTotal(docSnap.data().total);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (pageSize === 5) {
      setIsLoading(true);
    } else {
      setIsLoading2(true);
    }
    const q = query(
      collection(db, "feeds"),
      orderBy("createdAt", "desc"),
      limit(pageSize)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        const item = { id: doc.id, ...doc.data() };
        items.push(item);
      });
      const user =
        items.find((item) => item.creator.uid === auth.currentUser.uid)
          ?.creator || null;
      if (user) {
        setUserInfo({ ...userInfo, photoURL: user.photoURL });
      }
      setData(items);
      setIsLoading(false);
      setIsLoading2(false);
    });
    return unsubscribe;
  }, [pageSize]);

  useEffect(() => {
    getTotalCount();
  }, [data]);
  return { total, data, isLoading, isLoading2 };
};

// like or unlike
export const updateLike = async ({ action, item }) => {
  try {
    const { uid } = auth.currentUser;
    let incrementAmount = action === "LIKE" ? 1 : -1;

    const docRef = doc(db, "feeds", item.id);
    await updateDoc(docRef, {
      totalLike: increment(incrementAmount),
      whoLikes: action === "LIKE" ? arrayUnion(uid) : arrayRemove(uid),
    });

    if (action === "LIKE") {
      await createNotification({ item });
    }
  } catch (error) {
    console.log(error);
  }
};
