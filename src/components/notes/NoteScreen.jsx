import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { activeNote, startDeleteNote } from "../../actions/notes";
import { useForm } from "../../hooks/useForm";
import { NotesAppBar } from "./NotesAppBar";

export const NoteScreen = () => {
  //#region Redux
  const dispatch = useDispatch();
  const { activeNote: note } = useSelector((state) => state.notes);
  //#endregion Redux

  //#region States
  const { formValues, handleInputChange, reset } = useForm(note);
  const { title, body, id } = formValues;
  //#endregion States

  //#region Effects
  // actualiza el contenido de la nota cuando se cambia el estado
  useEffect(() => {
    reset(note);
  }, [note.id]);

  // actualiza el titulo y el cuerpo de la nota activa
  useEffect(() => {
    dispatch(activeNote(note.id, formValues));
  }, [formValues]);
  //#endregion Effects

  //#region Handles
  const handleDeleteNote = () => {
    // confirmar si se quiere eliminar la nota
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#30475E",
      cancelButtonColor: "#ff0000",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(startDeleteNote(id));
      }
    });
  };
  //#endregion Handles

  return (
    <div className={"notes__main-content"}>
      <NotesAppBar />

      <div className="notes__content">
        <input
          type="text"
          value={title}
          placeholder={"Title"}
          className="notes__title-input"
          autoCapitalize={"off"}
          name="title"
          onChange={handleInputChange}
        />
        <textarea
          value={body}
          placeholder={"Take a note..."}
          className="notes__textarea"
          autoCapitalize={"off"}
          name="body"
          onChange={handleInputChange}
        ></textarea>
        {note.imgUrl && (
          <div className="notes__image">
            <img src={note.imgUrl} alt="img" />
          </div>
        )}
        <button onClick={handleDeleteNote} className={"btn btn-delete"}>
          Delete
        </button>
      </div>
    </div>
  );
};
