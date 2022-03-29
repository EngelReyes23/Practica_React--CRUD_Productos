import { TYPES } from "../types/TYPES";

const initialState = { uid: "", name: "", email: "", rol: "" };

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.login:
      return {
        uid: action.payload.uid,
        name: action.payload.displayName,
        email: action.payload.email,
        rol: action.payload.rol,
      };

    case TYPES.logout:
      return {};

    default:
      return state;
  }
};
