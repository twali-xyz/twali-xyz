export const initialState = {
  userWallet: "",
  firstName: "",
  lastName: "",
  email: "",
  linkedIn: "",
};

const whitelistReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "ADD_USER":
      return {
        ...payload,
      };

    case "APPROVE_USER":
      return {
        ...state,
        userWallet: payload.userWallet,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        discord: payload.discord,
        linkedIn: payload.linkedIn,
        whitelistStatus: "approved",
      };

    case "REJECT_USER":
      return {
        ...state,
        userWallet: payload.userWallet,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        discord: payload.discord,
        linkedIn: payload.linkedIn,
        whitelistStatus: "rejected",
      };

    case "PENDING_USER":
      return {
        ...state,
        userWallet: payload.userWallet,
        firstName: payload.firstName,
        lastName: payload.lastName,
        email: payload.email,
        discord: payload.discord,
        linkedIn: payload.linkedIn,
        whitelistStatus: "pending",
      };

    default:
      return;
  }
};

export default whitelistReducer;
