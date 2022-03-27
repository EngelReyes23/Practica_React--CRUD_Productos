import { db } from "../firebase/firebaseConfig";
import { loadNotes } from "../helpers/loadNotes";
import { TYPES } from "../types/TYPES";
import { finishLoading, startLoading } from "./ui";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(startLoading());

    const uid = getState().auth.uid;
    console.log(uid);

    const newNote = {
      title: "title",
      body: "body",
      createdAt: new Date().getTime(),
    };

    const collectionPath = `users/${uid}/notes`;

    const doc = await db.collection(collectionPath).add(newNote);
    console.log(doc);
    dispatch(activeNote(doc.id, newNote));
    dispatch(finishLoading());
  };
};

export const activeNote = (id, note) => ({
  type: TYPES.notesActive,
  payload: { id, ...note },
});

export const getNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const setNotes = (notes) => ({
  type: TYPES.notesLoad,
  payload: notes,
});
