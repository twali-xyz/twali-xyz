import { useContext, useRef, useState } from "react";
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

import CeramicClient from "@ceramicnetwork/http-client";
import ThreeIdResolver from "@ceramicnetwork/3id-did-resolver";

import { EthereumAuthProvider, ThreeIdConnect } from "@3id/connect";
import { DID } from "dids";
import { IDX } from "@ceramicstudio/idx";
import { TileDocument } from "@ceramicnetwork/stream-tile";
import UserPermissionsRestricted from "../../UserPermissionsProvider/UserPermissionsRestricted";

export interface Identity {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  bio: string;
  twitterUsrName?: string;
  linkedInUsrName?: string;
  website?: string;
  businessName: string;
  businessType: string;
  businessLocation: string;
  currTitle: string;
  currLocation?: string;
  functionalExpertise: string;
  functionalExpertise2: string;
  functionalExpertise3: string;
  industryExpertise: string;
  industryExpertise2: string;
  industryExpertise3: string;
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
export interface ProfileData {
  content: {
    identity: Identity;
    accType: string;
  };
}

export interface BasicProfile {
  name: string;
}
// 3box test nodes with read/write access on ceramic clay testnet
// network node that we're interacting with, can be local/prod
// we're using a test network here
const endpoint = "https://ceramic-clay.3boxlabs.com";

const CompanyModal = (props) => {
  const finalRef = useRef();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyStart, setCompanyStart] = useState();
  const [companyEnd, setCompanyEnd] = useState();
  const [companyFunction, setCompanyFunction] = useState();
  const [companyIndustry, setCompanyIndustry] = useState();
  const [tempLogo, setTempLogo] = useState<any>();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [accType, setAccType] = useState(props.profileData.content.accType);
  const [identity, setIdentity] = useState(props.profileData.content.identity);
  const emptyCompanyInfo = {
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunction: "",
    companyIndustry: "",
  };

  const companyInfo =
    props.profileData.content.identity.companyInfo &&
    props.profileData.content.identity.companyInfo[props.currCompany]
      ? props.profileData.content.identity.companyInfo[props.currCompany]
      : emptyCompanyInfo;

  const [errors, setErrors] = useState({
    companyName: null,
    companyTitle: null,
    companyStart: null,
    companyEnd: null,
    companyFunction: null,
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
    companyFunction:
      companyInfo && companyInfo.companyFunction
        ? companyInfo.companyFunction
        : "",
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
    console.log(companyInfo, tempLogo);
    const address = await connect(); // first address in the array

    if (address) {
      const ceramic = new CeramicClient(endpoint);
      const threeIdConnect = new ThreeIdConnect();
      const provider = new EthereumAuthProvider(window.ethereum, address);

      setIsSubmitted(true);

      await threeIdConnect.connect(provider);

      const did = new DID({
        provider: threeIdConnect.getDidProvider(),
        resolver: {
          ...ThreeIdResolver.getResolver(ceramic),
        },
      });

      ceramic.setDID(did);
      await ceramic.did.authenticate();

      const idx = new IDX({ ceramic });

      // does not require signing to get user's public data
      const data: BasicProfile = await idx.get(
        "basicProfile",
        `${address}@eip155:1`
      );

      identity.companyInfo[props.currCompany] = {
        companyName: companyName,
        companyTitle: companyTitle,
        companyStart: companyStart,
        companyEnd: companyEnd,
        companyFunc: companyFunction,
        companyIndustry: companyIndustry,
        logo: tempLogo,
      };

      await updateProfileData(ceramic, identity, accType);

      console.log("Profile updated!");
      if (identity.firstName && identity.lastName && identity.email) {
        setIsSubmitted(false);
        props.handleUpdatedCompanyInfo(props.profileData, false);
        props.setProfileData(newProfileData);
        props.onClose();
        setTempLogo(false);
        setShouldFetch(false);
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  // Updates a stream to store JSON data with ceramic
  const updateProfileData = async (ceramic, identity, accType) => {
    const profileData = await TileDocument.deterministic(ceramic, {
      family: "user-profile-data",
    });

    await profileData.update({ identity, accType });
  };
  let newProfileData: ProfileData;
  const handleChange = (evt) => {
    evt.persist();
    setValues((values) => ({ ...values, [evt.target.name]: evt.target.value }));
    setErrors(validate(values));
    setIdentity({
      ...identity,
    });
    newProfileData = {
      content: {
        identity: identity,
        accType: props.profileData.content.accType,
      },
    };
    props.setProfileData(newProfileData);
    if (evt.target.name == "companyName") {
      setCompanyName(evt.target.value);
      setShouldFetch(true);
    } else if (evt.target.name !== "companyName") {
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
      setCompanyFunction(evt.target.value);
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
              setTempLogo(false);
              props.onClose();
              setShouldFetch(false);
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </>
  );
  console.log("COMP: ", !companyName, "LOGO: ", tempLogo);

  return (
    <>
      <Modal
        finalFocusRef={finalRef}
        isOpen={props.isOpen}
        onClose={() => {
          setTempLogo(false);
          props.onClose();
          setShouldFetch(false);
        }}
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
                    {shouldFetch ? (
                      <>
                        <CompanyInfoData
                          companyInfo={companyInfo}
                          companyName={companyName}
                          isDisabled={setDisabled}
                          tempLogo={tempLogo}
                          setTempLogo={setTempLogo}
                          shouldFetch={shouldFetch}
                        />
                      </>
                    ) : tempLogo?.message ? (
                      <>
                        <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
                          <Img
                            height="30px"
                            src={tempLogo?.message?.logo}
                            alt={tempLogo?.message?.domain}
                          />
                        </Box>
                      </>
                    ) : !tempLogo && companyInfo.logo?.message ? (
                      <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
                        <Img
                          height="30px"
                          src={companyInfo.logo?.message?.logo}
                          alt={companyInfo.logo?.message?.domain}
                        />
                      </Box>
                    ) : (companyName || tempLogo) &&
                      shouldFetch &&
                      companyInfo.companyName ? (
                      <>
                        <LogoFallBack companyName={companyInfo.companyName} />
                      </>
                    ) : !shouldFetch && !tempLogo && companyInfo.companyName ? (
                      <>
                        <LogoFallBack companyName={companyInfo.companyName} />
                      </>
                    ) : !shouldFetch && tempLogo && companyName ? (
                      <>
                        <LogoFallBack companyName={companyName} />
                      </>
                    ) : null}
                    <FormLabel>Company name</FormLabel>
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
                    {errors.companyName &&
                      (!companyInfo.companyName || !values.companyName) && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyName}
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
                      name="funcExpertise"
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
                      name="industryExpertise"
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
              <Button
                colorScheme="blue"
                mr={3}
                onClick={() => {
                  setTempLogo(false);
                  props.onClose();
                  setShouldFetch(false);
                }}
              >
                Close
              </Button>
              <Button
                isDisabled={isDisabled}
                onClick={() => {
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
  //
  // only fetch if event comes from 'company name' field
  //
  if (props.shouldFetch) {
    const fetcher = (
      companyDomain: string,
      ...args: Parameters<typeof fetch>
    ) => fetch(companyDomain).then((response) => response.json());

    let paramsObj = { params: props.companyName };
    let searchParams = new URLSearchParams(paramsObj);

    // Create a stable key for SWR
    searchParams.sort();
    const qs = searchParams.toString();

    const { data } = useSWR(`/api/cors?${qs}`, fetcher);
    if (!data) {
      props.isDisabled(false);
      props.setTempLogo(true);
    } else {
      props.isDisabled(false);
      props.setTempLogo(data);
    }

    return (
      // return when shouldFetch == true && logo data is found
      <>
        {data && data?.message && data?.message.logo ? (
          <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
            <Img
              height="30px"
              src={data.message.logo}
              alt={data.message.domain}
            />
          </Box>
        ) : props.companyName ? (
          // return when shouldFetch returns no data
          <>
            <LogoFallBack companyName={props.companyName} />
          </>
        ) : null}
      </>
    );
  }
  // the return value if shouldFetch  == false, uses cached logo if available otherwise falls back to first letter of company name
  return (
    <>
      {props.tempLogo &&
      props.tempLogo?.message &&
      props.tempLogo?.message.logo ? (
        <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
          <Img
            height="30px"
            src={props.tempLogo.message.logo}
            alt={props.tempLogo.message.domain}
          />
        </Box>
      ) : (
        props.companyName !== "" && (
          <>
            <LogoFallBack companyName={props.companyName} />
          </>
        )
      )}
    </>
  );
}

export function LogoFallBack(props) {
  console.log(3);

  return (
    <>
      <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
        <Box
          w={"1.75rem"}
          h={"1.75rem"}
          justifyContent={"center"}
          alignItems={"center"}
          bgGradient="linear-gradient(to right, #d1913c, #ffd194)"
          borderRadius={"50%"}
        >
          <Text
            w={"full"}
            h={"full"}
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            fontSize="xl"
            fontWeight="800"
            color="blue.700"
          >
            {props.companyName[0]?.toUpperCase()}
          </Text>
        </Box>
      </Box>
    </>
  );
}

export default CompanyModal;
