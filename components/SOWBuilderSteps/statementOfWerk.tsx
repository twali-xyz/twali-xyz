import {
  FormControl,
  Input,
  Box,
  Button,
  FormLabel,
  Textarea,
  HStack,
  CircularProgress,
  VStack,
  Alert,
  AlertIcon,
  Text,
  List,
  ListItem,
  ListIcon,
  Flex,
  Img
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useState, useRef } from "react";
import { useBounty } from "../../context/BountyContext";
import { UserData } from "../../utils/interfaces";
import useUser from "../../context/TwaliContext";
import axios from "axios";
import { truncate } from "../../utils/marketplaceUtils";

export const statementOfWerk = ({ handleChange }) => {
  const { setData, ...userState } = useUser();
  // const selectedFiles = [];
  const { setBounty, editBountyDescription, ...bountyState} = useBounty();
  const [userData, setUserData] = useState<UserData>({
    ...userState,
    // userName: "",
    // userWallet: "",
    // uuid: "",
    setData,
  });
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  // const downloadImg = async () => {
  //   await fetch(`/api/users/getImage?uuid=${uuid}`, {
  //     method: "GET",
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setNewImg(data);
  //     });
  // };
  const [isFileTooBig, setIsFileTooBig] = useState(false);

  const handleOpen = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const changeHandler = (event) => {
    let finalFile = event.target.files[0];
    let allFiles = selectedFiles;
    const fileSize = Math.round(finalFile.size / 1024);
    if (fileSize >= 1024) {
      setIsFileTooBig(true);
    } else {
      allFiles.push(finalFile);
      setSelectedFile(finalFile);
      setIsSelected(true);
      setIsFileTooBig(false);
      setSelectedFiles(allFiles);
    }
    console.log('Selected Files:', selectedFiles);
  };

  const checkIfUploadIsCompleted = (data) => {
    if (data) {
      setTimeout(function () {
        setIsSubmitted(false);
        setIsSelected(false);
      }, 5000);
    } else {
      console.log("error");
      setIsSubmitted(false);
    }
  };

  const uploadFile = async (file) => {
    setIsSubmitted(true);
    const filename = encodeURIComponent(file.name);
    const formData: any = new FormData();
    file._name = filename;
    formData.append("file", file);
    formData.append("userWallet", userData?.userWallet);
    formData.append("contractID", bountyState?.contractID);

    console.log('uploadddd formData', formData);
    console.log('file: ', file);
    axios
      .request({
        method: "post",
        url: "/api/users/postWerkFile",
        data: formData,
        onUploadProgress: (p) => {
          console.log(p);
        },
      })
      .then((data) => {
        console.log(data);
        setTimestamp(Date.now());
        checkIfUploadIsCompleted(data);
        let currAttachedFiles = bountyState.attachedFiles;
        currAttachedFiles.push(file.name);
        setBounty({
          ...bountyState,
          attachedFiles: currAttachedFiles
        });
      });
  };

  const handleRemoveWerkFile = (file) => {
    const formData: any = new FormData();
    formData.append("file", file);
    formData.append("userWallet", userData?.userWallet);
    formData.append("contractID", bountyState?.contractID);

    axios
      .request({
        method: "delete",
        url: "/api/users/removeWerkFile",
        data: formData,
      })
      .then((data) => {
        console.log('handleRemoveWerkFile: ', data);
        let allFiles = selectedFiles.filter(currFile => {
          return currFile.name !== file.name;
        });
        setSelectedFiles(allFiles);
      });
  }

    const handleSubmission = (evt) => {
      evt.preventDefault();
        if (selectedFile) {
          uploadFile(selectedFile);
          setIsSubmitted(false);
        }
    }

  return (
    <form style={{ alignSelf: "start" }}>
      <HStack spacing={24}>
      <Box
        maxWidth={"496px"}
        h="450px"
        w="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        backgroundColor={"n6"}
        opacity={"90%"}
        boxShadow={"8px 16px 24px 0px #062B2A8F"}
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <FormControl p={2} pb={0} id="werk-title" isRequired>
              <FormLabel
                marginBottom={1}
                pos={"relative"}
                fontFamily={"PP Telegraf"}
                fontSize={"16px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"24p"}
                letterSpacing={"0.02em"}
                textAlign={"left"}
              >
                Title
              </FormLabel>
              <Input
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                // isInvalid={errors.contractTitle}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={bountyState?.contractTitle || ""}
                required
                placeholder="Project Title"
                name="contractTitle"
                onChange={handleChange}
              />
              {/* <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.contractTitle ? "visible" : "hidden"}
              >
                {errors.contractTitle}
              </Text> */}
            </FormControl>
            <FormControl p={2} pb={0} id="statement-of-werk" isRequired>
              <FormLabel
                marginBottom={1}
                pos={"relative"}
                fontFamily={"PP Telegraf"}
                fontSize={"16px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"24p"}
                letterSpacing={"0.02em"}
                textAlign={"left"}
              >
                Statement of Werk
              </FormLabel>
              <Textarea
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"249px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                // isInvalid={errors.contractDescription}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                value={bountyState?.contractDescription || ""}
                required
                placeholder="Max Word Limit"
                name="contractDescription"
                onChange={handleChange}
              />
              {/* <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.contractDescription ? "visible" : "hidden"}
              >
                {errors.contractDescription}
              </Text> */}
            </FormControl>
          </Box>
        </Box>
      </Box>
      <Box
        maxWidth={"496px"}
        h="100%"
        w="xl"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        cursor="pointer"
        backgroundColor={"n6"}
        opacity={"90%"}
        boxShadow={"8px 16px 24px 0px #062B2A8F"}
        alignSelf="baseline"
      >
        <Box p="4">
          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
          >
            <FormControl p={2} pb={0} id="werk-title" isRequired>
              <FormLabel
                marginBottom={1}
                pos={"relative"}
                fontFamily={"PP Telegraf"}
                fontSize={"16px"}
                fontStyle={"normal"}
                fontWeight={"400"}
                lineHeight={"24p"}
                letterSpacing={"0.02em"}
                textAlign={"left"}
              >
                Upload related files
              </FormLabel>
              <VStack spacing={8}>
            <input type='file'
					   onChange={changeHandler}
					  //  accept={acceptedFileTypes}
					   name="attachedFiles"
					   ref={inputRef}
					   style={{display: 'none'}} />
            
            <Input
                cursor="pointer"
                px={2}
                fontSize="16px"
                borderColor={"n3"}
                height={"40px"}
                borderRadius={"4px"}
                marginBottom={"4px"}
                // isInvalid={errors.attachedFiles}
                errorBorderColor="red.300"
                fontFamily={"PP Telegraf light"}
                _placeholder={{ color: "subtle" }}
                // value={values?.attachedFiles || ""}
                required
                placeholder=".pdf, .word, .zip, .png, .jpeg"
                name="attachedFiles"
                onClick={handleOpen}
                readOnly={true}
                // onChange={changeHandler}
                // ref={inputRef}
              />
              {/* <Text
                fontSize="xs"
                height={"20.5px"}
                fontWeight="400"
                color="red.500"
                visibility={errors.attachedFiles ? "visible" : "hidden"}
              >
                {errors.attachedFiles}
              </Text> */}
              { selectedFiles ? (
                  <List alignSelf="flex-start">
                {selectedFiles.map((file, idx) => {
                    return (
                    <HStack spacing={2}>
                    <Img
                    src="twali-assets/circle-tick.svg"
                    />
                    <ListItem 
                    fontSize='16px' 
                    color="aqua"
                    fontFamily="PP Telegraf"
                    fontStyle="normal"
                    fontWeight="300"
                    lineHeight="24px"
                    letterSpacing="0.02em"
                    >
                      <Text>{truncate(file.name)}</Text>
                      </ListItem>
                      <ListIcon as={CloseIcon} color="whiteAlpha.400" fontSize="14px" onClick={() => handleRemoveWerkFile(file)}/>
                      </HStack>
                    )
                })}
                </List>
              ): null
              }
          {isFileTooBig ? (
          <Alert width={500} status="error">
            <AlertIcon />
            <Text
              fontFamily={"PP Telegraf"}
              fontSize="14px"
              lineHeight={"24px"}
              fontWeight={"400"}
              pos={"relative"}
            >
              Oops! Your file is too big. Please upload again! (less than 1MB)
            </Text>
          </Alert>
        ) : null}
          {isSelected && (
          <Button
            variant="primary"
            size={"md"}
            alignSelf="flex-end"
            onClick={(evt) => handleSubmission(evt)}
          >
            save{" "}
            {isSubmitted ? (
              <CircularProgress
                size="22px"
                thickness="4px"
                isIndeterminate
                color="#3C2E26"
              />
            ) : null}
          </Button>
        )}
                      </VStack>
            </FormControl>
          </Box>
        </Box>
      </Box>
      </HStack>
    </form>
  );
};
