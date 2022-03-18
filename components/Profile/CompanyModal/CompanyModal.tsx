import { useEffect, useRef, useState } from "react";
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
import { functionalExpertiseList } from "../../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../../utils/industryExpertiseConstants";

const CompanyModal = (props) => {
  const finalRef = useRef();
  const [count, setCount] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [companyName, setCompanyName] = useState();
  const [companyTitle, setCompanyTitle] = useState();
  const [companyStart, setCompanyStart] = useState();
  const [companyEnd, setCompanyEnd] = useState();
  const [companyFunction, setCompanyFunction] = useState();
  const [companyIndustry, setCompanyIndustry] = useState();
  const [tempLogo, setTempLogo] = useState<any>();
  const [shouldFetch, setShouldFetch] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState(props.userData);
  const emptyCompanyInfo = [{
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunction: "",
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

  // on open, set the values to the current company
  useEffect(() => {
    if (!props.isOpen) return;
    setCompanyName(
      props.userData?.companyInfo[props.currCompany]?.companyName
    );
    setCompanyTitle(
      props.userData?.companyInfo[props.currCompany]?.companyTitle
    );
    setCompanyStart(
      props.userData?.companyInfo[props.currCompany]?.companyStart
    );
    setCompanyEnd(
      props.userData?.companyInfo[props.currCompany]?.companyEnd
    );
    setCompanyFunction(
      props.userData?.companyInfo[props.currCompany]?.companyFunc
    );
    setCompanyIndustry(
      props.userData?.companyInfo[props.currCompany]?.companyExpertise
    );
    setTempLogo(
      props.userData?.companyInfo[props.currCompany]?.logo
    );
  }, [props.isOpen]);

  const companyInfo =
    props.userData.companyInfo &&
    props.userData.companyInfo[props.currCompany]
      ? props.userData.companyInfo[props.currCompany]
      : emptyCompanyInfo[props.currCompany];
  

  const [companyData, setCompanyData] = useState(companyInfo);

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
      companyInfo && companyInfo.companyFunc ? companyInfo.companyFunc : "",
    companyIndustry:
      companyInfo && companyInfo.industryExpertise
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

      if (userData.userWallet && userData.userName && companyData) {
        userData.companyInfo[props.currCompany] = companyData;

        let companyAttributes = {
          companyData: userData.companyInfo,
          userName: userData.userName,
          currCompany: props.currCompany,
        };
        console.log('Updated profile datA ON COMPANY MODAL: ', userData);

        updateUserCompanyData(userData.userWallet, companyAttributes);
        props.handleUpdatedCompanyInfo(props.userData, false);
        props.onClose();
        setShouldFetch(false);
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

    if (evt.target.name == "functionalExpertise") {
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
                      (name, idx) => (
                        <Tag
                          size={"md"}
                          key={`sm--${name}-${idx}`}
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
              setShouldFetch(false);
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
        onClose={() => {
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
                    ) : tempLogo?.message?.logo ? (
                      <>
                        <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
                          <Img
                            height="30px"
                            src={tempLogo?.message?.logo}
                            alt={tempLogo?.message?.domain}
                          />
                        </Box>
                      </>
                    ) : !tempLogo && companyInfo.logo?.message?.logo ? (
                      <Box w="full" borderRadius="lg" overflow="hidden" p={4}>
                        <Img
                          height="30px"
                          src={companyInfo.logo?.message?.logo}
                          alt={companyInfo.logo?.message?.domain + "here"}
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
                      name="companyFunc"
                      onChange={handleChange}
                    >
                      {functionalExpertiseList.map((item, idx) => {
                        return <option key={`&{item}--${idx}`}>{item}</option>;
                      })}
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
                      {industryExpertiseList.map((item, idx) => {
                        return <option key={`&{item}--${idx}`}>{item}</option>;
                      })}
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
        {data && data?.message && data?.message?.logo ? (
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
      props.tempLogo?.message?.logo ? (
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
