import { v4 as uuidv4 } from "uuid";

export const initialState = {
  userWallet: "",
  contractID: uuidv4(),
  contractCreatedOn: 1651968000,
  contractOwnerUserName: "",
  contractTitle: "",
  contractDescription: "",
  contractStartDate: 0,
  contractEndDate: 0,
  contractDuration: 0,
  tokenName: "",
  contractAmount: 0,
  convertedAmount: 0,
  applicationDeadline: 0,
  contractIndustry: [""],
  contractExpertise: [""],
  contractStatus: "draft",
  contractURI: "",
  attachedFiles: [],
  setBounty: Function,
  editBountyExpertise: Function,
  editBountyDetails: Function,
  editBountyHeader: Function,
  editBountyDescription: Function,
  editBountyURI: Function,
};

const bountyReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "SET_BOUNTYDATA":
      return {
        ...payload,
      };

    case "EDIT_BOUNTYURI":
      return {
        ...state,
        contractURI: payload.contractURI,
      };

    case "EDIT_BOUNTYEXPERTISE":
      return {
        ...state,
        contractExpertise: payload.contractExpertise,
        contractIndustry: payload.contractIndustry,
      };

    case "EDIT_BOUNTYDETAILS":
      return {
        ...state,
        contractStartDate: payload.contractStartDate,
        contractEndDate: payload.contractEndDate,
        contractDuration: payload.contractDuration,
        tokenName: payload.tokenName,
        contractAmount: payload.contractAmount,
        convertedAmount: payload.convertedAmount,
        applicationDeadline: payload.applicationDeadline,
      };

    case "EDIT_BOUNTYHEADER":
      return {
        ...state,
        contractTitle: payload.contractTitle,
      };

    case "EDIT_BOUNTYDESCRIPTION":
      return {
        ...state,
        contractDescription: payload.contractDescription,
        attachedFiles: payload.attachedFiles,
      };

    default:
      return;
  }
};

export default bountyReducer;
