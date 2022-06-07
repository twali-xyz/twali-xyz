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
}
