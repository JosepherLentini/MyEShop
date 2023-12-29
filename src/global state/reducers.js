export const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        id: action.payload.id,
        name: action.payload.name,
        email: action.payload.email,
        cart: action.payload.cart,
        purchases: action.payload.purchases,
      };

    case "ADD_ITEM":
      return {
        ...state,
        cart: action.payload.cart,
      };
     
    default:
      return state;
  }
};
