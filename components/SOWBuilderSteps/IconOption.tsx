import {
    Img,
  } from "@chakra-ui/react";

const IconOption = (props) => (
    <>
    <option>
      {props.label}
      <Img
              borderRadius="full"
              backgroundColor="transparent"
              width="32px"
              src="twali-assets/plusicon.png"
              alt="add img"
            />
    </option>
     <Img
       borderRadius="full"
       backgroundColor="transparent"
       width="8px"
       src="https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/info/logo.png"
       alt="add img"
     />
    </>
);
export default IconOption;