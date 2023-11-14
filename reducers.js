const initialState = {
  user: {
    permissions: [], // Aquí deberías tener tus permisos iniciales
  },
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    // Implementa tus reducers según tus necesidades
    default:
      return state;
  }
};

export default rootReducer;
