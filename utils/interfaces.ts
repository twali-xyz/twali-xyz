
export interface UserData {
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
  funcExpertise?: [];
  industryExpertise?: [];
  companyInfo?: CompanyInfo[];
}

export interface CompanyInfo {
  companyName: string;
  companyTitle: string;
  companyImg: any;
  companyStart: Date;
  companyEnd: Date;
  companyFunc: string;
  companyIndustry: string;
}

 