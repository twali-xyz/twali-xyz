export interface UserData {
  PK: string,
  SK: string,
  userName: string;
  userWallet: string;
  accType: string;
  firstName: string;
  lastName: string;
  email: string;
  bio?: string;
  twitter?: string;
  linkedIn?: string;
  website?: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  currTitle: string;
  currLocation?: string;
  functionalExpertise?: string[];
  industryExpertise?: string[];
  companyInfo?: CompanyInfo[];
  uuid: string;
  editExpertise: Function,
  editProfile: Function,
  editCompany: Function,
  setData: Function
}
export interface CompanyInfo {
  companyName: string;
  companyTitle: string;
  companyImg: any;
  companyStart: Date;
  companyEnd: Date;
  companyFunc: string;
  companyIndustry: string;
  companyDescription: string;
  logo: any;
  currentStatus: Number;
}

export interface Bounty {
  userWallet: string;
  contractID: string;
  contractCreatedOn: number;
  contractOwnerUserName: string;
  contractTitle: string;
  contractDescription: string;
  contractStartDate: number;
  contractEndDate: number;
  contractDuration: number;
  contractURI: string;
  tokenName: string;
  contractAmount: number;
  convertedAmount: number;
  applicationDeadline: number;
  contractIndustry: string[];
  contractExpertise: string[];
  contractStatus: string;
  attachedFiles: any[];
  setBounty: Function,
  editBountyExpertise: Function,
  editBountyDetails: Function,
  editBountyHeader: Function,
  editBountyDescription: Function,
  editBountyURI: Function
}

export interface Contract {
  PK: string;
  SK: string;
  application_deadline: number;
  contractOwner_userName: string;
  contract_created_on: number;
  contract_id: string;
  contract_description: string;
  contract_duration: string;
  contract_start_date: number;
  contract_end_date: number;
  contract_title: string;
  token_name: string;
  contract_amount: number;
  converted_amount: number;
  applicationDeadline: number;
  contract_industry: string[];
  contract_expertise: string[];
  contract_status: string;
  attached_files: any[];
}

export interface ProjectProposal {
  expertUserName: string;
  proposalDetails: string;
  applicationStatus: string;
  rejectionText?: string;
}