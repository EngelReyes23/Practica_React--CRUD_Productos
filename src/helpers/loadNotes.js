import { db } from "../firebase/firebaseConfig";

export const loadNotes = async (uid) => {
  const collectionPath = `users/${uid}/notes`;

  const notes = await db.collection(collectionPath).get();
  const notesToArray = notes.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return notesToArray;
};
