import { ContractHistory } from "./ContractData/contractHistory";
import { NewContractForm } from "./newContractForm";

const AdminDashBoard = () => {


    return(
        <>
            <ContractHistory />
            <NewContractForm />
        </>
    )
};

export default AdminDashBoard;