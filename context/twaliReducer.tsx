export const initialState = {
  PK: "",
  SK: "",
  userName: "",
  userWallet: "",
  accType: "",
  firstName: "",
  lastName: "",
  email: "",
  bio: "",
  twitter: "",
  linkedIn: "",
  website: "",
  businessName: "",
  businessType: "",
  businessLocation: "",
  currTitle: "",
  currLocation: "",
  referredBy: "",
  referredUsers: [],
  functionalExpertise: [""],
  industryExpertise: [""],
  companyInfo: [],
  uuid: "",
  editExpertise: Function(),
  editProfile: Function(),
  editCompany: Function(),
  setData: Function(),
};

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_USERDATA":
      return {
        ...payload,
      };

    case "EDIT_EXPERTISE":
      return {
        ...state,
        functionalExpertise: payload.functionalExpertise,
        industryExpertise: payload.industryExpertise,
      };

    case "EDIT_PROFILE":
      return {
        ...state,
        firstName: payload.firstName,
        lastName: payload.lastName,
        currTitle: payload.currTitle,
        email: payload.email,
        currLocation: payload.currLocation,
        bio: payload.bio,
        linkedIn: payload.linkedIn,
        twitter: payload.twitter,
      };

    case "EDIT_COMPANY_INFO":
      return {
        ...state,
        companyInfo: payload.companyInfo,
      };

    default:
      return;
  }
};

export default userReducer;
