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
  Img,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { truncate } from "../../../utils/marketplaceUtils";
import { useState, useRef } from "react";
import { useBounty } from "../../../context/BountyContext";
import { UserData } from "../../../utils/interfaces";
import useUser from "../../../context/TwaliContext";
import axios from "axios";
import path from "path";

type WerkFileUploadProps = {};

const WerkFileUpload = (props: WerkFileUploadProps) => {
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const inputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState();
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isFileTooBig, setIsFileTooBig] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isUploadError, setIsUploadError] = useState(false);
  const { setData, ...userState } = useUser();
  const { setBounty, editBountyDescription, ...bountyState } = useBounty();
  const [userData, setUserData] = useState<UserData>({
    ...userState,
    // userName: "",
    // userWallet: "",
    // uuid: "",
    setData,
  });

  const handleOpen = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const changeHandler = (event) => {
    setIsUploaded(false);
    setIsUploadError(false);
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
    let currAttachedFiles = bountyState.attachedFiles;

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
        setTimestamp(Date.now());
        checkIfUploadIsCompleted(data);
        currAttachedFiles.push(path.parse(file.name).name);
        setBounty({
          ...bountyState,
          attachedFiles: currAttachedFiles,
        });
        setIsUploaded(true);
      })
      .catch((err) => {
        setIsUploadError(true);
        let allFiles = selectedFiles.filter((currFile) => {
          return currFile.name !== file.name;
        });
        setSelectedFile(null);
        setIsSelected(false);
        setSelectedFiles(allFiles);
        setTimeout(function () {
          setIsUploadError(false);
        }, 3000);
        console.log(err);
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
        let allFiles = selectedFiles.filter((currFile) => {
          return currFile.name !== file.name;
        });
        setSelectedFiles(allFiles);
        setBounty({
          ...bountyState,
          attachedFiles: allFiles,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmission = (evt) => {
    evt.preventDefault();
    if (selectedFile) {
      uploadFile(selectedFile);
      setIsSubmitted(false);
    }
  };

  return (
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
        <input
          type="file"
          onChange={changeHandler}
          //  accept={acceptedFileTypes}
          name="attachedFiles"
          ref={inputRef}
          style={{ display: "none" }}
        />

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
        {selectedFiles ? (
          <List alignSelf="flex-start">
            {selectedFiles.map((file, idx) => {
              return (
                <HStack spacing={2} key={file + idx}>
                  <Img src="twali-assets/circle-tick.svg" />
                  <ListItem
                    fontSize="16px"
                    color="aqua"
                    fontFamily="PP Telegraf"
                    fontStyle="normal"
                    fontWeight="300"
                    lineHeight="24px"
                    letterSpacing="0.02em"
                  >
                    <Text>{truncate(file.name)}</Text>
                  </ListItem>
                  <ListIcon
                    as={CloseIcon}
                    color="whiteAlpha.400"
                    fontSize="14px"
                    onClick={() => handleRemoveWerkFile(file)}
                  />
                </HStack>
              );
            })}
          </List>
        ) : null}
        {isFileTooBig ? (
          <Alert width={500} status="error" marginInlineStart="48px">
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
        ) : isUploadError ? (
          <Alert
            width={500}
            status="error"
            marginInlineStart="48px"
            justifyContent={"center"}
            alignItems={"center"}
          >
            <AlertIcon ml={5} />
            <Text
              fontFamily={"PP Telegraf"}
              fontSize="14px"
              lineHeight={"24px"}
              fontWeight={"400"}
              pos={"relative"}
              whiteSpace={"pre-wrap"}
            >
              Oops! There was an error uploading your file. Check your
              connection and try again
            </Text>
          </Alert>
        ) : isUploaded && !isFileTooBig ? (
          <Alert width={500} status="success" marginInlineStart="48px">
            <AlertIcon />
            <Text
              fontFamily={"PP Telegraf"}
              fontSize="14px"
              lineHeight={"24px"}
              fontWeight={"400"}
              pos={"relative"}
            >
              Your file was uploaded!
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
            upload{" "}
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
  );
};

export default WerkFileUpload;
