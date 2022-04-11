import { TwaliSlider } from "../../reusable/TwaliSlider";
import { Chip } from "../../reusable/Chip";
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
  Textarea,
} from "@chakra-ui/react";
import useSWR from "swr";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { connect } from "../../../utils/walletUtils";
import UserPermissionsRestricted from "../../UserPermissionsProvider/UserPermissionsRestricted";
import { functionalExpertiseList } from "../../../utils/functionalExpertiseConstants";
import { industryExpertiseList } from "../../../utils/industryExpertiseConstants";
import useUser from "../../../context/TwaliContext";
import useDebounce from "../../../utils/useDebounce";

const CompanyModal = (props) => {
  const finalRef = useRef();
  const { editCompany, ...userState } = useUser();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(false);
  const [logo, setlogo] = useState<any>();
  const [isDisabled, setIsDisabled] = useState(false);
  const emptyCompanyInfo = {
    companyName: "",
    companyTitle: "",
    companyStart: "",
    companyEnd: "",
    companyFunc: "",
    companyIndustry: "",
    logo: false,
  };
  const [compStart, setCompStart] = useState(undefined);
  const [compEnd, setCompEnd] = useState(undefined);
  const [companyData, setCompanyData] = useState<any>();
  const [currentStatus, setCurrentStatus] = useState(0);
  useEffect(() => {
    if (!props.isOpen) {
      setlogo(false);
      setCompanyData(emptyCompanyInfo);
      return;
    }
    setCompanyData(
      userState?.companyInfo && userState?.companyInfo[props.currCompany]
        ? userState?.companyInfo[props.currCompany]
        : emptyCompanyInfo
    );

    {
      userState?.companyInfo[props.currCompany] &&
        setlogo(userState?.companyInfo[props.currCompany].logo);
      setCompStart(userState?.companyInfo[props.currCompany]?.companyStart);
      setCompEnd(userState?.companyInfo[props.currCompany]?.companyEnd);
      setCurrentStatus(
        Number(userState?.companyInfo[props.currCompany]?.currentStatus) || 0
      );
    }
  }, [props.isOpen]);

  useEffect(() => {
    if (currentStatus) {
      setCompanyData({
        ...companyData,
        companyEnd: "",
        currentStatus: currentStatus,
      });
    } else {
      setCompanyData({
        ...companyData,
        companyStart: compStart,
        companyEnd: compEnd,
        currentStatus: currentStatus,
      });
    }
  }, [compStart, compEnd, currentStatus]);

  const [errors, setErrors] = useState({
    companyName: null,
    companyTitle: null,
    companyStart: null,
    companyEnd: null,
    companyFunction: null,
    companyIndustry: null,
    companyDescription: null,
  });

  const convertDates = (start, end) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let newStart = new Date(start).toLocaleDateString(undefined, options);
    if (end) {
      let newEnd = new Date(end).toLocaleDateString(undefined, options);
      return `${newStart} - ${newEnd}`;
    }
    return newStart;
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

      if (userState.userWallet && userState.userName && companyData) {
        userState.companyInfo[props.currCompany] = companyData;

        let companyAttributes = {
          companyData: userState.companyInfo,
          userName: userState.userName,
          currCompany: props.currCompany,
        };
        companyAttributes.companyData[props.currCompany].logo = logo;
        updateUserCompanyData(userState.userWallet, companyAttributes);
        editCompany(companyAttributes.companyData);
        props.onClose();
        setlogo(false);
        setCompanyData(emptyCompanyInfo);
        setShouldFetch(false);
        setIsSubmitted(false);
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
    setErrors(validate(companyData));
    if (evt.target.name == "companyName") {
      setShouldFetch(true);
    }
  };

  const validate = (companyData) => {
    let errors: any = {};

    if (!companyData.companyName) {
      errors.companyName = "Company name is required";
    }

    if (!companyData.companyTitle) {
      errors.companyTitle = "Job title is required";
    }

    var datePattern =
      /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;

    if (!companyData.companyStart) {
      errors.companyStart = "Start date (DD-MM-YYYY) is required";
    }

    if (
      companyData.companyStart &&
      !datePattern.test(companyData.companyStart)
    ) {
      errors.companyStart = "Start date (DD-MM-YYYY) is incorrect";
    }

    if (!companyData.companyEnd) {
      errors.companyEnd = "End date (DD-MM-YYYY) is required";
    }

    if (companyData.companyEnd && !datePattern.test(companyData.companyEnd)) {
      errors.companyEnd = "End date (DD-MM-YYYY) is incorrect";
    }

    if (companyData.companyFunc === "") {
      errors.companyFunc = "Functional expertise is required";
    }

    if (companyData.companyIndustry === "") {
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
        backgroundColor={"n6"}
        boxShadow={"8px 16px 24px 0px #062B2A8F"}
        border={"1px solid rgba(88, 112, 112, 1)"}
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

                {companyData.companyDescription ? (
                  <Text fontSize="lg">{companyData.companyDescription}</Text>
                ) : null}

                {companyData.companyStart && companyData.companyEnd ? (
                  <Text fontSize="md" color="gray.500">
                    {companyDateRange}
                  </Text>
                ) : companyData.companyStart && companyData.currentStatus ? (
                  <Text fontSize="md" color="gray.500">
                    {convertDates(companyData.companyStart, null)} - now
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
                        <Chip
                          key={`expertChip--${name}-${idx}`}
                          name={name}
                          idx={idx}
                        >
                          {name}
                        </Chip>
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
          setCompanyData(emptyCompanyInfo);
        }}
        key={`companymodal--${props.currCompany}`}
      >
        <ModalOverlay />
        <ModalContent
          backgroundColor={"n6"}
          boxShadow={"8px 16px 24px 0px #062B2A8F"}
          border={"1px solid rgba(88, 112, 112, 1)"}
          fontFamily={"PP Telegraf"}
        >
          <UserPermissionsRestricted to="edit" fallback={companyModalView}>
            <ModalHeader pb={0} mt={"20px"}>
              Update your work experience
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody fontSize={"14px"} lineHeight={"24px"} fontWeight={"400"}>
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
                    ) : companyData.logo?.message?.logo ? (
                      <Box w="full" borderRadius="lg" overflow="hidden" p={2}>
                        <Img
                          height={"48px"}
                          src={companyData.logo?.message?.logo}
                          alt={companyData.logo?.message?.domain}
                        />
                      </Box>
                    ) : companyData.companyName ? (
                      <>
                        <LogoFallBack companyName={companyData.companyName} />
                      </>
                    ) : null}
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                    >
                      Company name
                    </FormLabel>
                    <Input
                      fontFamily={"PP Telegraf Light"}
                      required
                      isInvalid={errors.companyName && !companyData.companyName}
                      errorBorderColor="red.300"
                      placeholder="Company name"
                      name="companyName"
                      defaultValue={companyData.companyName || ""}
                      onChange={handleChange}
                    />
                    {errors.companyName && !companyData.companyName && (
                      <Text fontSize="xs" fontWeight="400" color="red.500">
                        {errors.companyName}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl p={2} id="company-title">
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                    >
                      Job title
                    </FormLabel>
                    <Input
                      fontFamily={"PP Telegraf Light"}
                      required
                      isInvalid={
                        errors.companyTitle && !companyData.companyTitle
                      }
                      errorBorderColor="red.300"
                      placeholder="Job title"
                      name="companyTitle"
                      defaultValue={companyData.companyTitle || ""}
                      onChange={handleChange}
                    />
                    {errors.companyTitle && !companyData.companyTitle && (
                      <Text fontSize="xs" fontWeight="400" color="red.500">
                        {errors.companyTitle}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl p={2} id="company-description">
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                    >
                      Job Description
                    </FormLabel>
                    <Textarea
                      fontFamily={"PP Telegraf Light"}
                      required
                      isInvalid={
                        errors.companyDescription &&
                        !companyData.companyDescription
                      }
                      errorBorderColor="red.300"
                      placeholder="Job Description"
                      name="companyDescription"
                      defaultValue={companyData.companyDescription || ""}
                      onChange={handleChange}
                    />
                    {errors.companyDescription &&
                      !companyData.companyDescription && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyDescription}
                        </Text>
                      )}
                  </FormControl>
                  <FormControl p={2} id="company-start">
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                    >
                      What was your start date?
                    </FormLabel>

                    <DatePicker
                      onChange={setCompStart}
                      value={compStart ? new Date(compStart) : compStart}
                    />
                    {errors.companyStart && !companyData.companyStart && (
                      <Text fontSize="xs" fontWeight="400" color="red.500">
                        {errors.companyStart}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl p={2} id="company-end">
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                    >
                      What was your end date?
                    </FormLabel>
                    <DatePicker
                      onChange={setCompEnd}
                      value={compEnd ? new Date(compEnd) : compEnd}
                      disabled={!!companyData.currentStatus || !!currentStatus}
                    />

                    {errors.companyEnd &&
                      !companyData.currentStatus &&
                      !companyData.companyEnd && (
                        <Text fontSize="xs" fontWeight="400" color="red.500">
                          {errors.companyEnd}
                        </Text>
                      )}
                    {errors.companyName && !companyData.companyName && (
                      <Text fontSize="xs" fontWeight="400" color="red.500">
                        {errors.companyName}
                      </Text>
                    )}
                  </FormControl>
                  <FormControl p={2} id="company-current">
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                      mt={2}
                    >
                      I currently work here
                    </FormLabel>
                    <TwaliSlider
                      setCurrentStatus={setCurrentStatus}
                      currentStatus={currentStatus}
                      defaultValue={companyData.currentStatus || 0}
                      marks={["No", "Yes"]}
                    />
                  </FormControl>
                  <FormControl p={2} id="company-func">
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                    >
                      Functional expertise
                    </FormLabel>
                    <Select
                      required
                      fontFamily={"PP Telegraf Light"}
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
                    <FormLabel
                      fontSize={"16px"}
                      lineHeight={"24px"}
                      fontWeight={"400"}
                      fontFamily={"PP Telegraf"}
                    >
                      Industry
                    </FormLabel>
                    <Select
                      required
                      fontFamily={"PP Telegraf Light"}
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
                variant="primary"
                size={"sm"}
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
  //
  // only fetch if event comes from 'company name' field
  //
  const fetcher = (companyDomain: string, ...args: Parameters<typeof fetch>) =>
    fetch(companyDomain).then((response) => response.json());

  let paramsObj = { params: props.companyName };
  let searchParams = new URLSearchParams(paramsObj);

  // Create a stable key for SWR
  searchParams.sort();
  const qs = searchParams.toString();

  const debouncedSearch = useDebounce(qs, 450);
  const { data } = useSWR(
    () => (debouncedSearch ? `/api/cors?${debouncedSearch}` : null),
    fetcher
  );

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
      {data?.message?.logo ? (
        <Box w="full" borderRadius="lg" overflow="hidden" p={2}>
          <Img
            height={"48px"}
            src={data?.message?.logo}
            alt={data?.message?.domain}
          />
        </Box>
      ) : (
        <>
          {props.companyName !== "" && (
            <>
              <LogoFallBack companyName={props.companyName} />
            </>
          )}
        </>
      )}
    </>
  );
}

function LogoFallBack(props) {
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
