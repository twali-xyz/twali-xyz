import { useRef, useState } from "react";
import {
  Box,
  HStack,
  VStack,
  Heading,
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  Button,
  ModalHeader,
  ModalFooter,
  FormControl,
  FormLabel,
  Text,
  CircularProgress,
  Input,
  Select,
  Img,
  Tag,
} from "@chakra-ui/react";
import useSWR from "swr";
import { connect } from "../../../utils/walletUtils";
import UserPermissionsRestricted from "../../UserPermissionsProvider/UserPermissionsRestricted";
// import { convertFromDB } from '../../../utils/profileUtils';

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
  funcExpertise: string;
  industryExpertise: string;
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

const CompanyModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyStart, setCompanyStart] = useState();
  const [companyEnd, setCompanyEnd] = useState();
  const [companyFunc, setCompanyFunc] = useState();
  const [companyIndustry, setCompanyIndustry] = useState();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [profileData, setProfileData] = useState(props.profileData);
  const emptyCompanyInfo = [{
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunc: "",
    companyIndustry: "",
  }, 
  {
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunc: "",
    companyIndustry: "",
  },
  {
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunc: "",
    companyIndustry: "",
  },
  {
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunc: "",
    companyIndustry: "",
  },
  {
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunc: "",
    companyIndustry: "",
  },
];

  const companyInfo =
    props.profileData.companyInfo &&
    props.profileData.companyInfo[props.currCompany]
      ? props.profileData.companyInfo[props.currCompany]
      : emptyCompanyInfo[props.currCompany];
  

  const [companyData, setCompanyData] = useState(companyInfo);

  const [errors, setErrors] = useState({
    companyName: null,
    companyTitle: null,
    companyStart: null,
    companyEnd: null,
    companyFunc: null,
    companyIndustry: null,
  });

  const [values, setValues] = useState({
    companyName:
      companyInfo && companyInfo.companyName ? companyInfo.companyName : "",
    companyTitle:
      companyInfo && companyInfo.companyTitle ? companyInfo.companyTitle : "",
    companyStart:
      companyInfo && companyInfo.companyStart ? companyInfo.companyStart : "",
    companyEnd:
      companyInfo && companyInfo.companyEnd ? companyInfo.companyEnd : "",
    companyFunc:
      companyInfo && companyInfo.companyFunc ? companyInfo.companyFunc : "",
    companyIndustry:
      companyInfo && companyInfo.companyIndustry
        ? companyInfo.companyIndustry
        : "",
  });

  const convertDates = (start, end) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let newStart = new Date(start).toLocaleDateString(undefined, options);
    let newEnd = new Date(end).toLocaleDateString(undefined, options);
    return `${newStart} - ${newEnd}`;
  };

  let companyDateRange;
  if (companyInfo && companyInfo.companyStart && companyInfo.companyEnd) {
    companyDateRange = convertDates(
      companyInfo.companyStart,
      companyInfo.companyEnd
    );
  }

  async function updateCompanyInfo() {
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);

      if (profileData.userWallet && profileData.userName && companyData) {
        profileData.companyInfo[props.currCompany] = companyData;

        let companyAttributes = {
          companyData: profileData.companyInfo,
          userName: profileData.userName,
          currCompany: props.currCompany,
        };
        console.log('Updated profile datA ON COMPANY MODAL: ', profileData);

        updateUserCompanyData(profileData.userWallet, companyAttributes);
        props.handleUpdatedCompanyInfo(profileData);
        props.onClose();
        window.location.reload();
        setIsSubmitted(false);
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  const updateUserCompanyData = async (userWallet, attributes) => {
    let userData = { userWallet, attributes}
    await fetch(`/api/users/updateUser?updateUser=company`, {
      method: "PUT",
      body: JSON.stringify({ userData }),
    });
    console.log("USER Company data UPDATED BRUH");
  };

  const handleChange = (evt) => {
    evt.persist();
    setValues((values) => ({ ...values, [evt.target.name]: evt.target.value }));
    setErrors(validate(values));

    setCompanyData({
      ...companyData,
      [evt.target.name]: evt.target.value
    });

    if (evt.target.name == "companyName") {
      setCompanyName(evt.target.value);
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }

    if (evt.target.name == "companyTitle") {
      setCompanyTitle(evt.target.value);
    }

    if (evt.target.name == "companyStart") {
      setCompanyStart(evt.target.value);
    }

    if (evt.target.name == "companyEnd") {
      setCompanyEnd(evt.target.value);
    }

    if (evt.target.name == "funcExpertise") {
      setCompanyFunc(evt.target.value);
    }

    if (evt.target.name == "industryExpertise") {
      setCompanyIndustry(evt.target.value);
    }
  };

  const validate = (values) => {
    let errors: any = {};

    if (!values.companyName) {
      errors.companyName = "Company name is required";
    }

    if (!values.companyTitle) {
      errors.companyTitle = "Job title is required";
    }

    var datePattern =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    if (!values.companyStart) {
      errors.companyStart = "Start date (DD-MM-YYYY) is required";
    }

    if (values.companyStart && !datePattern.test(values.companyStart)) {
      errors.companyStart = "Start date (DD-MM-YYYY) is incorrect";
    }

    if (!values.companyEnd) {
      errors.companyEnd = "End date (DD-MM-YYYY) is required";
    }

    if (values.companyEnd && !datePattern.test(values.companyEnd)) {
      errors.companyEnd = "End date (DD-MM-YYYY) is incorrect";
    }

    if (values.companyFunc === "") {
      errors.companyFunc = "Functional expertise is required";
    }

    if (values.companyIndustry === "") {
      errors.companyIndustry = "Industry expertise is required";
    }

    return errors;
  };

  const setDisabled = (isDisabled) => {
    setIsDisabled(isDisabled);
  };

  const companyModalView = (
    <>
      <ModalContent>
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} padding={10}>
            {companyInfo ? (
              <>
                {companyInfo.companyName ? ( // TODO: We can display a company logo here
                  <>
                    {/* <CompanyInfoData
                companyName={companyInfo.companyName}
                isDisabled={setDisabled}
              /> */}
                    <Heading>{companyInfo.companyName}</Heading>
                  </>
                ) : null}

                {companyInfo.companyTitle ? (
                  <Text fontSize="2xl">{companyInfo.companyTitle}</Text>
                ) : null}

                {companyInfo.companyStart && companyInfo.companyEnd ? (
                  <Text fontSize="md" color="gray.500">
                    {companyDateRange}
                  </Text>
                ) : null}

                {companyInfo.companyFunc && companyInfo.companyIndustry ? (
                  <HStack spacing={4}>
                    {[companyInfo.companyFunc, companyInfo.companyIndustry].map(
                      (name) => (
                        <Tag
                          size={"md"}
                          key={`sm--${name}`}
                          variant="solid"
                          colorScheme="teal"
                        >
                          {name}
                        </Tag>
                      )
                    )}
                  </HStack>
                ) : null}
              </>
            ) : null}
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              props.onClose();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={props.onClose}
        key={`companymodal--${props.currCompany}`}
      >
        <ModalOverlay />
        <ModalContent>
          <UserPermissionsRestricted to="edit" fallback={companyModalView}>
            <ModalHeader>Update your work experience</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {companyInfo ? (
                <form style={{ alignSelf: "center" }}>
                  <FormControl p={2} id="company-name">
                    <FormLabel>Company name</FormLabel>
                    {shouldFetch && (
                      <CompanyInfoData
                        companyName={companyName}
                        isDisabled={setDisabled}
                      />
                    )}
                    <Input
                      required
                      isInvalid={
                        errors.companyName &&
                        (!companyInfo.companyName || !values.companyName)
                      }
                      errorBorderColor="red.300"
                      placeholder="Company name"
                      name="companyName"
                      defaultValue={companyInfo.companyName || ""}
                      onChange={handleChange}
                    />
                    {errors.companyName &&
                      (!companyInfo.companyName || !values.companyName) && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyName}
                        </Text>
                      )}
                  </FormControl>
                  <FormControl p={2} id="company-title">
                    <FormLabel>Job title</FormLabel>
                    <Input
                      required
                      isInvalid={
                        errors.companyTitle &&
                        (!companyInfo.companyTitle || !values.companyTitle)
                      }
                      errorBorderColor="red.300"
                      placeholder="Job title"
                      name="companyTitle"
                      defaultValue={companyInfo.companyTitle || ""}
                      onChange={handleChange}
                    />
                    {errors.companyTitle &&
                      (!companyInfo.companyTitle || !values.companyTitle) && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyTitle}
                        </Text>
                      )}
                  </FormControl>
                  <FormControl p={2} id="company-start">
                    <FormLabel>What was your start date?</FormLabel>
                    <Input
                      required
                      isInvalid={
                        errors.companyStart &&
                        (!companyInfo.companyStart || !values.companyStart)
                      }
                      errorBorderColor="red.300"
                      name="companyStart"
                      defaultValue={companyInfo.companyStart || ""}
                      onChange={handleChange}
                    />
                    {errors.companyStart &&
                      (!companyInfo.companyStart || !values.companyStart) && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyStart}
                        </Text>
                      )}
                  </FormControl>
                  <FormControl p={2} id="company-end">
                    <FormLabel>What was your end date?</FormLabel>
                    <Input
                      required
                      isInvalid={
                        errors.companyEnd &&
                        (!companyInfo.companyEnd || !values.companyEnd)
                      }
                      errorBorderColor="red.300"
                      name="companyEnd"
                      defaultValue={companyInfo.companyEnd || ""}
                      onChange={handleChange}
                    />
                    {errors.companyEnd &&
                      (!companyInfo.companyEnd || !values.companyEnd) && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyEnd}
                        </Text>
                      )}
                  </FormControl>
                  <FormControl p={2} id="company-func">
                    <FormLabel>Functional expertise</FormLabel>
                    <Select
                      required
                      defaultValue={companyInfo.companyFunc}
                      errorBorderColor="red.300"
                      placeholder="Select functional expertise"
                      name="companyFunc"
                      onChange={handleChange}
                    >
                      <option>Accounting</option>
                      <option>Creative</option>
                      <option>Audit</option>
                      <option>Board & Advisory</option>
                      <option>Corporate Development</option>
                      <option>Comp & Benefits</option>
                      <option>Compliance</option>
                      <option>Management Consulting</option>
                      <option>Data & Analytics</option>
                      <option>Product Design</option>
                      <option>Digital</option>
                      <option>Engineering</option>
                      <option>Entrepreneurship</option>
                      <option>Finance</option>
                      <option>General Management</option>
                      <option>Human Resources</option>
                      <option>IT Infrastructure</option>
                      <option>Innovation</option>
                      <option>Investor</option>
                      <option>Legal</option>
                      <option>Marketing</option>
                      <option>Media & Comms</option>
                      <option>Merchandising</option>
                      <option>Security</option>
                      <option>Operations</option>
                      <option>Portfolio Operations</option>
                      <option>Procurement</option>
                      <option>Product Management</option>
                      <option>Investor Relations</option>
                      <option>Regulatory</option>
                      <option>Research</option>
                      <option>Risk</option>
                      <option>Strategy</option>
                      <option>Technology</option>
                      <option>Transformation</option>
                      <option>Sales & Customer</option>
                      <option>Data Science</option>
                      <option>Talent Acquisition</option>
                      <option>Tax</option>
                      <option>Cybersecurity</option>
                      <option>Investment Banking</option>
                      <option>Supply Chain</option>
                    </Select>
                  </FormControl>
                  <FormControl p={2} id="company-industry">
                    <FormLabel>Industry</FormLabel>
                    <Select
                      required
                      defaultValue={companyInfo.companyIndustry}
                      errorBorderColor="red.300"
                      placeholder="Select industry expertise"
                      name="companyIndustry"
                      onChange={handleChange}
                    >
                      <option>Accounting</option>
                      <option>Angel Investment</option>
                      <option>Asset Management</option>
                      <option>Auto Insurance</option>
                      <option>Banking</option>
                      <option>Bitcoin</option>
                      <option>Commercial Insurance</option>
                      <option>Commercial Lending</option>
                      <option>Credit</option>
                      <option>Credit Bureau</option>
                      <option>Credit Cards</option>
                      <option>Crowdfunding</option>
                      <option>Cryptocurrency</option>
                      <option>Debit Cards</option>
                      <option>Debt Collections</option>
                      <option>Finance</option>
                      <option>Financial Exchanges</option>
                      <option>Financial Services</option>
                      <option>FinTech</option>
                      <option>Fraud Detection</option>
                      <option>Funding Platform</option>
                      <option>Gift Card</option>
                      <option>Health Insurance</option>
                      <option>Hedge Funds</option>
                      <option>Impact Investing</option>
                      <option>Incubators</option>
                      <option>Insurance</option>
                      <option>InsurTech</option>
                      <option>Leasing</option>
                      <option>Lending</option>
                      <option>Life Insurance</option>
                      <option>Micro Lending</option>
                      <option>Mobile Payments</option>
                      <option>Payments</option>
                      <option>Personal Finance</option>
                      <option>Prediction Markets</option>
                      <option>Property Insurance</option>
                      <option>Real Estate Investment</option>
                      <option>Stock Exchanges</option>
                      <option>Trading Platform</option>
                      <option>Transaction Processing</option>
                      <option>Venture Capital</option>
                      <option>Virtual Currency</option>
                      <option>Wealth Management</option>
                    </Select>
                  </FormControl>
                </form>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={props.onClose}>
                Close
              </Button>
              <Button
                isDisabled={isDisabled}
                onClick={() => {
                  setShouldFetch(false);
                  updateCompanyInfo();
                }}
                variant="ghost"
              >
                Save{" "}
                {isSubmitted ? (
                  <CircularProgress
                    size="22px"
                    thickness="4px"
                    isIndeterminate
                    color="#3C2E26"
                  />
                ) : null}
              </Button>
            </ModalFooter>
          </UserPermissionsRestricted>
        </ModalContent>
      </Modal>
    </>
  );
};

// Client-side data fetching for Clearbit's NameToDomain API (on company modal load)
function CompanyInfoData(props) {
  console.log(props);
  const fetcher = (companyDomain: string, ...args: Parameters<typeof fetch>) =>
    fetch(companyDomain).then((response) => response.json());

  let paramsObj = { params: props.companyName };
  let searchParams = new URLSearchParams(paramsObj);

  // Create a stable key for SWR
  searchParams.sort();
  const qs = searchParams.toString();

  const { data } = useSWR(`/api/cors?${qs}`, fetcher);
  console.log("DATA: ", data);
  if (!data) {
    props.isDisabled(true);
  } else {
    props.isDisabled(false);
  }

  return (
    <>
      {data && data.message && data.message.logo ? (
        <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
          <Img
            height="30px"
            src={data.message.logo}
            alt={data.message.domain}
          />
        </Box>
      ) : (
        <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
          <Text fontSize="xs" fontWeight="400" color="red.500">
            Company logo is unavailable or name is incorrect.
          </Text>
        </Box>
      )}
    </>
  );
}

export default CompanyModal;
