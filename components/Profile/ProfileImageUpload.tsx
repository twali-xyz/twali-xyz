import { Button, Img, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

export default function ProfileImageUpload(props) {
  const userName = props.userName;
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const reference = useRef(null);

  const changeHandler = (event) => {
    let finalFile = event.target.files[0];
    // finalFile.userName = userName;
    setSelectedFile(finalFile);
    setIsSelected(true);
    console.log(finalFile);
  };

  const handleOpen = () => {
    if (reference.current) {
      reference.current.click();
    }
  };
  const handleSubmission = (evt) => {
    evt.preventDefault();
    console.log(selectedFile);
    if (selectedFile) {
      uploadImage(selectedFile);
    }
  };

  const uploadImage = async (file) => {
    const filename = encodeURIComponent(file.name);
    console.log(filename);
    // const res = await fetch(`/api/users/postImage?file=${filename}`);
    // const { url, fields } = await res.json();
    // console.log(fields);
    const formData: any = new FormData();
    file.filename = filename;
    formData.append('file', file);

    const upload = await fetch(`/api/users/postImage`, {
      method: 'POST',
      body: formData,
    });

    if (upload.ok) {
      console.log('Uploaded successfully!');
    } else {
      console.error('Upload failed.');
    }

    console.log("IMAGE UPLOADED");
  };

  return (
    <>
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
        <Img
          borderRadius="full"
          width="160px"
          height="160px"
          src="fox-pfp.png"
          alt="fox stock img"
        />
      </Button>
      {isSelected && (
        <Button onClick={(evt) => handleSubmission(evt)}>save profile pic</Button>
      )}
    </>
  );
}
