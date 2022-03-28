import Swal from "sweetalert2";

import { db } from "../firebase/firebaseConfig";
import { uploadFile } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { TYPES } from "../types/TYPES";
import { finishLoading, startLoading } from "./ui";

// Crea una nueva nota
export const startNewNote = () => {
  /* INFO: Dispatch y getState los provee redux-thunk cuando recibe una función
  en lugar de un objeto */
  return async (dispatch, getState) => {
    dispatch(startLoading());

    const uid = getState().auth.uid;

    // Cuerpo de la nota
    const newNote = {
      title: "",
      body: "",
      createdAt: new Date().getTime(),
    };

    // Ruta de la colección de notas en firebase
    const collectionPath = `users/${uid}/notes`;

    // Sube la nota a firebase
    const doc = await db.collection(collectionPath).add(newNote);

    dispatch(activeNote(doc.id, newNote)); // Selecciona la nota creada
    dispatch(addNewNote(doc.id, newNote)); // Agrega la nota a la lista de notas
    dispatch(finishLoading());
  };
};

// Agrega una nueva nota a la lista de notas
const addNewNote = (id, note) => ({
  type: TYPES.notesAddNew,
  payload: { id, ...note },
});

// Establece la nota activa
export const activeNote = (id, note) => ({
  type: TYPES.notesActive,
  payload: { id, ...note },
});

// Obtiene todas las notas de la base de datos
export const getNotes = (uid) => {
  return async (dispatch) => {
    dispatch(startLoading());

    // Carga las notas de la base de datos
    const notes = await loadNotes(uid);

    dispatch(setNotes(notes)); // Establece las notas en el estado
    dispatch(finishLoading());
  };
};

// Establece las notas[]
export const setNotes = (notes) => ({
  type: TYPES.notesLoad,
  payload: notes,
});

// Guarda la nota en la base de datos
export const saveNote = (note) => {
  return async (dispatch, getState) => {
    // Obtiene el uid del usuario del estado
    const uid = getState().auth.uid;

    // Ruta de la colección de notas en firebase
    const collectionPath = `users/${uid}/notes`;

    /* Verifica si la nota contiene imgUrl, si no
    entonces elimina el campo */
    if (!note.imgUrl) delete note.imgUrl;

    // Hace una copia de la nota para mandarla a firestore
    const noteToFirestore = { ...note };
    delete noteToFirestore.id; // Elimina el id de la nota

    try {
      // Actualiza la nota en firestore
      await db.doc(`${collectionPath}/${note.id}`).update(noteToFirestore);

      // Actualiza la nota en el estado
      dispatch(refreshNotes(note.id, note));

      Swal.fire("Saved!", "Your note has been saved!", "success");
    } catch {
      Swal.fire("Error!", "Your note has not been saved!", "error");
    }
  };
};

// Actualiza la nota especifica localmente
export const refreshNotes = (id, note) => ({
  type: TYPES.notesUpdate,
  payload: {
    id,
    note,
  },
});

// Comienza la subida del archivo
export const startUploading = (file) => {
  return async (dispatch, getState) => {
    // Obtiene la nota activa
    const { activeNote: note } = getState().notes;

    // Muestra un loading mientras se sube el archivo
    Swal.fire({
      title: "Uploading...",
      text: "Please wait...",
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      // UploadFile sube el archivo y retorna la url
      const secureUrl = await uploadFile(file);

      note.imgUrl = secureUrl; // Actualiza la nota con la url del archivo
      dispatch(activeNote(note.id, note)); // Actualiza la nota activa en el estado
      dispatch(saveNote(note)); // Guarda la nota en la base de datos
    } catch (error) {
      Swal.fire("Error!", error.message, "error");
    }
  };
};

// Comienza la eliminación de la nota en firebase
export const startDeleteNote = (id) => {
  return async (dispatch, getState) => {
    const uid = getState().auth.uid; // Obtiene el uid del usuario del estado

    // Ruta de la colección de notas en firebase
    const collectionPath = `users/${uid}/notes`;

    try {
      // Elimina la nota de firebase
      await db.doc(`${collectionPath}/${id}`).delete();

      dispatch(deleteNote(id)); // Elimina la nota de la lista de notas

      Swal.fire("Deleted!", "Your note has been deleted!", "success");
    } catch {
      Swal.fire("Error!", "Your note has not been deleted!", "error");
    }
  };
};

// Elimina la nota de la lista de notas
const deleteNote = (id) => ({
  type: TYPES.notesDelete,
  payload: id,
});

// Purga las notas al cerrar la sesión
export const notesLogout = () => ({
  type: TYPES.notesLogout,
});
