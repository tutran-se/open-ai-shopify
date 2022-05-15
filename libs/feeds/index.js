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
} from "firebase/firestore";

import { auth, db } from "../../config/firebase";
import { getAnswer } from "../../config/axios";
import { useState, useEffect } from "react";

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

  const getTotalCount = async () => {
    try {
      const docRef = doc(db, "appInfo", "totalFeedsCount");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        console.log(docSnap.data().total);
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
