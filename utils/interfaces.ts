export interface ProfileData {
    content: {
      identity: Identity;
      accType: string;
    };
  }
  
  export interface Identity {
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    bio: string;
    twitter?: string;
    linkedIn?: string;
    website?: string;
    businessName: string;
    businessType: string;
    businessLocation: string;
    currTitle: string;
    currLocation?: string;
    functionalExpertise: any[];
    industryExpertise: any[];
    companyInfo?: CompanyInfo[];
  }
  
  export interface BasicProfile {
    name: string;
  }
  export interface Profile {
    identity: Identity;
    name: string;
    accType: string;
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