import { TYPES } from "../types/TYPES";

// Establece el error
const setError = (errorName) => ({
  type: TYPES.uiSetError,
  payload: errorName,
});

// Retira el error
const removeError = () => ({
  type: TYPES.uiRemoveError,
});

// Muestra el error por 3 segundos
export const showError = (errorName) => {
  return (dispatch) => {
    dispatch(setError(errorName));

    // retira el error después de 3 segundos
    setTimeout(() => {
      dispatch(removeError());
    }, 2000);
  };
};

// Muestra el loading
export const startLoading = () => ({ type: TYPES.uiStartLoading });

// Oculta el loading
export const finishLoading = () => ({ type: TYPES.uiFinishLoading });

export const setShowForm = () => ({ type: TYPES.uiShowForm });

export const setHideForm = () => ({ type: TYPES.uiHideForm });
