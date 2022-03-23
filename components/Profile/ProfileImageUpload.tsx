import { Button, Img, Input } from "@chakra-ui/react";
import React, { useRef, useState } from "react";

export default function ProfileImageUpload() {
  const [selectedFile, setSelectedFile] = useState({
    name: "",
    type: "",
    size: "",
    lastModifiedDate: undefined,
  });
  const [isSelected, setIsSelected] = useState(false);
  const reference = useRef(null);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    console.log(event.target.files[0]);
  };

  const handleOpen = () => {
    if (reference.current) {
      reference.current.click();
    }
  };
  const handleSubmission = () => {};

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
        <Button onClick={handleSubmission}>save profile pic</Button>
      )}
    </>
  );
}
