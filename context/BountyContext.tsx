import React, {
    createContext,
    useContext,
    useReducer,
} from 'react';
import { Bounty } from '../utils/interfaces';
import bountyReducer, { initialState } from './bountyReducer';

const Bounty = createContext<Bounty>(initialState);

const BountyContext = ({ children }): JSX.Element => {
    const [state, dispatch] = useReducer(bountyReducer, initialState);

    function setBounty(newState: Bounty) {
        dispatch({
          type: "SET_BOUNTYDATA",
          payload: {
            ...newState,
          },
        });
      }

    function editBountyExpertise(
        contractExpertise: string[],
        contractIndustry: string[]
      ) {
        dispatch({
          type: "EDIT_BOUNTYEXPERTISE",
          payload: {
            contractExpertise: contractExpertise,
            contractIndustry: contractIndustry,
          },
        });
      }
    
    function editBountyDetails(
        contractStartDate: number,
        contractEndDate: number,
        contractDuration: number,
        applicationDeadline: number,
      ) {
        dispatch({
          type: "EDIT_BOUNTYDETAILS",
          payload: {
            contractStartDate: contractStartDate,
            contractEndDate: contractEndDate,
            contractDuration: contractDuration,
            applicationDeadline: applicationDeadline,
          },
        });
      }

      function editBountyHeader(
        contractTitle: string,
      ) {
        dispatch({
          type: "EDIT_BOUNTYHEADER",
          payload: {
            contractTitle: contractTitle,
          },
        });
      }

    
    function editBountyDescription(
        contractDescription: string,
        attachedFiles: any[]
      ) {
        dispatch({
          type: "EDIT_BOUNTYDESCRIPTION",
          payload: {
            contractDescription: contractDescription,
            attachedFiles: attachedFiles,
          },
        });
      }

    return (
        <Bounty.Provider value={{ 
            ...state,
            setBounty,
            editBountyExpertise,
            editBountyDetails,
            editBountyHeader,
            editBountyDescription
            }}>
            {children}
        </Bounty.Provider>
    )

}

export default BountyContext;

export const useBounty = () => {
    const context = useContext(Bounty);
    if (context === undefined) {
        throw new Error("BountyState must be used with BountyContext");
      }
    return context;
}

