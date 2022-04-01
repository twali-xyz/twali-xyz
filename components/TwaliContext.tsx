import { createContext, useReducer, useContext } from "react";
import { UserData } from "../utils/interfaces";
import userReducer, { initialState } from "./twaliReducer";

const UserContext = createContext(initialState);

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  function setData(newState: UserData) {
    dispatch({
      type: "SET_USERDATA",
      payload: {
        ...newState,
      },
    });
  }

  function editExpertise(functionalExpertise: [], industryExpertise: []) {
    dispatch({
      type: "EDIT_EXPERTISE",
      payload: {
        functionalExpertise: [...functionalExpertise],
        industryExpertise: [...industryExpertise],
      },
    });
  }

  function editProfile(newState: UserData) {
    dispatch({
      type: "EDIT_PROFILE",
      payload: {
        firstName: newState.firstName,
        lastName: newState.lastName,
        currTitle: newState.currTitle,
        email: newState.email,
        currLocation: newState.currLocation,
        bio: newState.bio,
        linkedIn: newState.linkedIn,
        twitter: newState.twitter,
      },
    });
  }

  return (
    <UserContext.Provider
      value={{
        ...state,
        editExpertise,
        setData,
        editProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used with UserContext");
  }
  return context;
};

export default useUser;
