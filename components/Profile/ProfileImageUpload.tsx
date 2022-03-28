import { Box, Button, Img, Input, CircularProgress, Text, Alert, AlertIcon } from "@chakra-ui/react";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios';

export default function ProfileImageUpload(props) {
  const uuid = props.uuid;
  const [selectedFile, setSelectedFile] = useState({
    name: "",
    size: null,
    type: "",
  });
  const [isSelected, setIsSelected] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timestamp, setTimestamp] = useState(Date.now());
  const [isFileTooBig, setIsFileTooBig] = useState(false);
  const reference = useRef(null);
  const [newImg, setNewImg] = useState('');

  const initializeImage = async () => {
    try {
      await fetch(`/api/users/getImage?uuid=${uuid}`, {
        method: 'GET',
      }).then(res => res.json()).then(data => {
        setNewImg(data);
      });
    } catch(err) {
      console.log('No previous image found');
    }
  }

  useEffect( () => {
    initializeImage();
  }, [newImg == '']); 

  const changeHandler = (event) => {
    let finalFile = event.target.files[0];
    const fileSize = Math.round((finalFile.size / 1024)); 
    if (fileSize >= 1024) {
      setIsFileTooBig(true);
    } else {
      setSelectedFile(finalFile);
      setIsSelected(true);
      setIsFileTooBig(false);
    }
    console.log(finalFile);
  };

  const handleOpen = () => {
    if (reference.current) {
      reference.current.click();
    }
  };
  const handleSubmission = (evt) => {
    evt.preventDefault();
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    setIsSubmitted(true);
    const filename = encodeURIComponent(file.name);
    const formData: any = new FormData();
    file.filename = filename;
    formData.append('file', file);
    formData.append('uuid', uuid);

    axios.request({
      method: "post", 
      url: "/api/users/postImage", 
      data: formData, 
      onUploadProgress: (p) => {
        //console.log(p); 
      }
  }).then (data => {
      setTimestamp(Date.now())
      checkIfUploadIsCompleted(data);
  })};
  

  const checkIfUploadIsCompleted = (data) => {
    if (data) {
      downloadImg();
      setTimeout(function() {
        setIsSubmitted(false);
        setIsSelected(false);
        window.location.reload();
      }, 5000);
    } else {
      console.log('error');
      setIsSubmitted(false);
    }
  }

  const downloadImg = async () => {
    await fetch(`/api/users/getImage?uuid=${uuid}`, {
      method: 'GET',
    }).then(res => res.json()).then(data => {
      setNewImg(data);
    });
  };

  const viewProfileImg = (
    <>
    { newImg ? (
      <Box 
        height={"160px"}
        width={"160px"}>
          <Img
            key={`${newImg}--view-profile-img`}
            src={`data:image/jpeg;base64,${newImg}`}
            alt={`${newImg}`}
          />
      </Box>
    ): null}
  </>
  )

  return (
    <>
    <UserPermissionsRestricted
            to="edit"
            key={`${timestamp}--usr-permission`}
            fallback={viewProfileImg}
          >
      <Input
        type="file"
        name="profilePhoto"
        visibility={"hidden"}
        onChange={changeHandler}
        ref={reference}
      />

      <Button
        name="file"
        height={"160px"}
        width={"160px"}
        alignSelf="center"
        overflow="hidden"
        pos={"relative"}
        bottom={5}
        marginBottom={0}
        p={0}
        onClick={handleOpen}
      >

        { newImg ? (
          <Img
          key={timestamp}
          src={`data:image/jpeg;base64,${newImg}`}
          alt={`${newImg}`}
        />
        ): <Img
        borderRadius="full"
        width="80px"
        height="80px"
        src="twali-assets/plusicon.png"
        alt="plus icon"
      />}
      </Button>
      {selectedFile && selectedFile.name ? <Text
        fontFamily={"PP Telegraf"}
        fontSize="14px"
        lineHeight={"24px"}
        fontWeight={"400"}
        pos={"relative"}
      >{selectedFile.name}</Text>: null}
      {isFileTooBig ? <Alert width={500} status='error'>
    <AlertIcon />
    <Text
        fontFamily={"PP Telegraf"}
        fontSize="14px"
        lineHeight={"24px"}
        fontWeight={"400"}
        pos={"relative"}
      >Oops! Your image is too big. Please upload again! (less than 1MB)</Text>
  </Alert>: null}
      {isSelected && (
        <Button onClick={(evt) => handleSubmission(evt)}>save {isSubmitted ? <CircularProgress
        size="22px"
        thickness="4px"
        isIndeterminate
        color="#3C2E26"
      />: null}</Button>
      )}
      </UserPermissionsRestricted>
    </>
  );
}
