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
  const [shouldFetch, setShouldFetch] = useState(false);
  const [tempCompany, setTempCompany] = useState<any>({});
  const [logo, setlogo] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(false);
  const [userData, setUserData] = useState(props.userData);
  const emptyCompanyInfo = {
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunc: "",
    companyIndustry: "",
    companyLogo: false,
  };

  const [companyData, setCompanyData] = useState<any>();

  useEffect(() => {
    if (!props.isOpen) {
      setlogo(false);
      return;
    }
    setCompanyData(
      props.userData.companyInfo &&
        props.userData.companyInfo[props.currCompany]
        ? props.userData.companyInfo[props.currCompany]
        : emptyCompanyInfo
    );
    {
      props.userData?.companyInfo[props.currCompany] &&
        setlogo(props.userData?.companyInfo[props.currCompany].logo);
    }
    return () => {};
  }, [props.isOpen]);

  const [errors, setErrors] = useState({
    companyName: null,
    companyTitle: null,
    companyStart: null,
    companyEnd: null,
    companyFunction: null,
    companyIndustry: null,
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
  if (companyData && companyData.companyStart && companyData.companyEnd) {
    companyDateRange = convertDates(
      companyData.companyStart,
      companyData.companyEnd
    );
  }

  async function updateCompanyInfo() {
    const address = await connect(); // first address in the array

    if (address) {
      setIsSubmitted(true);

      if (userData.userWallet && userData.userName && companyData) {
        userData.companyInfo[props.currCompany] = companyData;
        console.log(companyData);

        let companyAttributes = {
          companyData: userData.companyInfo,
          userName: userData.userName,
          currCompany: props.currCompany,
        };
        companyAttributes.companyData[props.currCompany].logo = logo;
        updateUserCompanyData(userData.userWallet, companyAttributes);
        props.handleUpdatedCompanyInfo(props.userData, false);
        props.onClose();
        setlogo(false);
        setTempCompany(emptyCompanyInfo);
        setShouldFetch(false);
        setIsSubmitted(false);
        window.location.reload();
      } else {
        console.log("No profile, pls create one...");
      }
    }
  }

  const updateUserCompanyData = async (userWallet, attributes) => {
    let userData = { userWallet, attributes };
    await fetch(`/api/users/updateUser?updateUser=company`, {
      method: "PUT",
      body: JSON.stringify({ userData }),
    });
    console.log("USER Company data UPDATED BRUH");
  };

  const handleChange = (evt) => {
    evt.persist();

    setCompanyData({ ...companyData, [evt.target.name]: evt.target.value });
    setTempCompany({
      ...companyData,
      [evt.target.name]: evt.target.value,
    });
    setErrors(validate(tempCompany));
    if (evt.target.name == "companyName") {
      setShouldFetch(true);
    }
  };

  const validate = (tempCompany) => {
    let errors: any = {};

    if (!tempCompany.companyName) {
      errors.companyName = "Company name is required";
    }

    if (!tempCompany.companyTitle) {
      errors.companyTitle = "Job title is required";
    }

    var datePattern =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    if (!tempCompany.companyStart) {
      errors.companyStart = "Start date (DD-MM-YYYY) is required";
    }

    if (
      tempCompany.companyStart &&
      !datePattern.test(tempCompany.companyStart)
    ) {
      errors.companyStart = "Start date (DD-MM-YYYY) is incorrect";
    }

    if (!tempCompany.companyEnd) {
      errors.companyEnd = "End date (DD-MM-YYYY) is required";
    }

    if (tempCompany.companyEnd && !datePattern.test(tempCompany.companyEnd)) {
      errors.companyEnd = "End date (DD-MM-YYYY) is incorrect";
    }

    if (tempCompany.companyFunc === "") {
      errors.companyFunc = "Functional expertise is required";
    }

    if (tempCompany.companyIndustry === "") {
      errors.companyIndustry = "Industry expertise is required";
    }

    return errors;
  };

  const setDisabled = (isDisabled) => {
    setIsDisabled(isDisabled);
  };

  const companyModalView = (
    <>
      <ModalContent
        backgroundColor={"#041A19"}
        fontFamily={"PP Telegraf Light"}
      >
        <ModalCloseButton />
        <ModalBody>
          <VStack spacing={6} padding={10}>
            {companyData ? (
              <>
                {companyData.companyName ? (
                  <>
                    <Heading fontWeight={"500"} textTransform={"capitalize"}>
                      {companyData.companyName}
                    </Heading>
                  </>
                ) : null}

                {companyData.companyTitle ? (
                  <Text fontSize="2xl">{companyData.companyTitle}</Text>
                ) : null}

                {companyData.companyStart && companyData.companyEnd ? (
                  <Text fontSize="md" color="gray.500">
                    {companyDateRange}
                  </Text>
                ) : null}

                {companyData.companyFunc && companyData.companyIndustry ? (
                  <HStack
                    spacing={4}
                    display={"flex"}
                    alignContent={"baseline"}
                  >
                    {[companyData.companyFunc, companyData.companyIndustry].map(
                      (name, idx) => (
                        <Box
                          key={`sm--${name}-${idx}`}
                          borderRadius={"32px"}
                          backgroundImage={
                            "linear-gradient(#0DD5D1 0%, #9350B3 100%)"
                          }
                          p={"1px"}
                        >
                          <Text
                            fontSize="14px"
                            lineHeight={"24px"}
                            fontFamily={"PP Telegraf"}
                            alignSelf={"start"}
                            backgroundColor={"#0A2625"}
                            p={"4px 12px"}
                            borderRadius={"32px"}
                            whiteSpace={"nowrap"}
                          >
                            {name}
                          </Text>
                        </Box>
                      )
                    )}
                  </HStack>
                ) : null}
              </>
            ) : null}
          </VStack>
        </ModalBody>
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
          setlogo(false);

          setShouldFetch(false);
          setTempCompany(emptyCompanyInfo);
        }}
        key={`companymodal--${props.currCompany}`}
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={"#041A19"}
          fontFamily={"PP Telegraf Light"}
        >
          <UserPermissionsRestricted to="edit" fallback={companyModalView}>
            <ModalHeader fontSize={"18px"} lineHeight={"28px"} pb={0}>
              Update your work experience
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {companyData ? (
                <form style={{ alignSelf: "center" }}>
                  <FormControl p={2} id="company-name">
                    {shouldFetch ? (
                      <>
                        <CompanyInfoData
                          companyName={companyData.companyName}
                          isDisabled={setDisabled}
                          logo={logo}
                          setlogo={setlogo}
                          shouldFetch={shouldFetch}
                        />
                      </>
                    ) : logo?.message?.logo ? (
                      <>
                        <Box w="full" borderRadius="lg" overflow="hidden" p={2}>
                          <Img
                            height={"48px"}
                            src={logo?.message?.logo}
                            alt={logo?.message?.domain}
                          />
                        </Box>
                      </>
                    ) : !logo && companyData.logo?.message?.logo ? (
                      <Box w="full" borderRadius="lg" overflow="hidden" p={2}>
                        <Img
                          height={"48px"}
                          src={companyData.logo?.message?.logo}
                          alt={companyData.logo?.message?.domain}
                        />
                      </Box>
                    ) : (companyData.companyName || logo) &&
                      shouldFetch &&
                      companyData.companyName ? (
                      <>
                        <LogoFallBack companyName={companyData.companyName} />
                      </>
                    ) : !shouldFetch && !logo && companyData.companyName ? (
                      <>
                        <LogoFallBack companyName={companyData.companyName} />
                      </>
                    ) : !shouldFetch && logo && companyData.companyName ? (
                      <>
                        <LogoFallBack companyName={companyData.companyName} />
                      </>
                    ) : null}
                    <FormLabel>Company name</FormLabel>
                    <Input
                      required
                      isInvalid={
                        errors.companyName &&
                        (!companyData.companyName || !tempCompany.companyName)
                      }
                      errorBorderColor="red.300"
                      placeholder="Company name"
                      name="companyName"
                      defaultValue={companyData.companyName || ""}
                      onChange={handleChange}
                    />
                    {errors.companyName &&
                      (!companyData.companyName ||
                        !tempCompany.companyName) && (
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
                        (!companyData.companyTitle || !tempCompany.companyTitle)
                      }
                      errorBorderColor="red.300"
                      placeholder="Job title"
                      name="companyTitle"
                      defaultValue={companyData.companyTitle || ""}
                      onChange={handleChange}
                    />
                    {errors.companyTitle &&
                      (!companyData.companyTitle ||
                        !tempCompany.companyTitle) && (
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
                        (!companyData.companyStart || !tempCompany.companyStart)
                      }
                      errorBorderColor="red.300"
                      name="companyStart"
                      defaultValue={companyData.companyStart || ""}
                      onChange={handleChange}
                    />
                    {errors.companyStart &&
                      (!companyData.companyStart ||
                        !tempCompany.companyStart) && (
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
                        (!companyData.companyEnd || !tempCompany.companyEnd)
                      }
                      errorBorderColor="red.300"
                      name="companyEnd"
                      defaultValue={companyData.companyEnd || ""}
                      onChange={handleChange}
                    />
                    {errors.companyEnd &&
                      (!companyData.companyEnd || !tempCompany.companyEnd) && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyEnd}
                        </Text>
                      )}
                    {errors.companyName &&
                      (!companyData.companyName ||
                        !tempCompany.companyName) && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyName}
                        </Text>
                      )}
                  </FormControl>
                  <FormControl p={2} id="company-func">
                    <FormLabel>Functional expertise</FormLabel>
                    <Select
                      required
                      defaultValue={companyData.companyFunc}
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
                      defaultValue={companyData.companyIndustry}
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
                isDisabled={isDisabled}
                onClick={() => {
                  updateCompanyInfo();
                }}
                variant="ghost"
                backgroundColor={"#C7F83C"}
                color={"#0A1313"}
                fontFamily={"PP Telegraf Bold"}
                fontWeight={"700"}
              >
                Save
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
      props.setlogo(true);
    } else {
      props.isDisabled(false);
      props.setlogo(data);
    }

    return (
      // return when shouldFetch == true && logo data is found
      <>
        {data && data?.message && data?.message?.logo ? (
          <Box w="full" borderRadius="lg" overflow="hidden" p={2}>
            <Img
              height={"48px"}
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
      {props.logo && props.logo?.message && props.logo?.message?.logo ? (
        <Box w="full" borderRadius="lg" overflow="hidden" p={2}>
          <Img
            height={"48px"}
            src={props.logo.message.logo}
            alt={props.logo.message.domain}
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
      <Box w="full" borderRadius="lg" overflow="hidden" p={2}>
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
            fontFamily={"GrandSlang"}
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
