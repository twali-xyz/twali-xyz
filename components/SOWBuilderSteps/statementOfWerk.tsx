import {
  FormControl,
  Input,
  Box,
  Button,
  FormLabel,
  Textarea,
  HStack,
  CircularProgress,
  VStack
} from "@chakra-ui/react";
import { useState, useRef } from "react";
import { useBounty } from "../../context/BountyContext";
import { UserData } from "../../utils/interfaces";
import useUser from "../../context/TwaliContext";
import axios from "axios";

export const statementOfWerk = ({ handleChange }) => {
  const { setData, ...userState } = useUser();
  const { setBounty, ...bountyState} = useBounty();
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

  const handleOpen = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const changeHandler = (event) => {
    const newFiles = []
    for(let i = 0; i < event.target.files.length; i++){
        newFiles.push(event.target.files[i])
        const filesSize = Math.round(event.target.files[i].size / 1024);
        console.log(filesSize);
    }
    // if (fileSize >= 1024) {
    //   setIsFileTooBig(true);
    // } else {
      // if (imgPreview.current) {
      //   imgPreview.current.src = URL.createObjectURL(finalFile);
      // }
      setSelectedFiles(newFiles);
      setIsSelected(true);
      // setIsFileTooBig(false);
    // }
    console.log(newFiles);
  };

  const checkIfUploadIsCompleted = (data) => {
    if (data) {
      // downloadImg();
      setTimeout(function () {
        setIsSubmitted(false);
        setIsSelected(false);
        window.location.reload();
      }, 5000);
    } else {
      console.log("error");
      setIsSubmitted(false);
    }
  };

  const uploadFiles = async (files) => {
    // setIsSubmitted(true);
    // const finalFiles = []
    const formData: any = new FormData();

    for(let i = 0; i < files.length; i++){
      const filename = encodeURIComponent(files[i].name);
      files[i]._name = filename;
      console.log('uploadddd');
      console.log(files[i]);
      // finalFiles.push(files[i])
      formData.append("files", files[i]);
  }
    console.log('userrrrr', userData.userWallet);
    
    formData.append("userWallet", userData.userWallet);

    axios
      .request({
        method: "post",
        url: "/api/users/postWerkFiles",
        data: formData,
        onUploadProgress: (p) => {
          //console.log(p);
        },
      })
      .then((data) => {
        setTimestamp(Date.now());
        checkIfUploadIsCompleted(data);
      });
  };

  const handleSubmission = (evt) => {
    evt.preventDefault();
    if (selectedFiles) {
      uploadFiles(selectedFiles);
    }
  };

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
        h="250px"
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
            multiple
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
