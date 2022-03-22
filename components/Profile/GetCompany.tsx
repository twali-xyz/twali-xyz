import { Box, Img, Text } from "@chakra-ui/react";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";

export const GetCompany = (props) => {
  return (
    <>
      {props.company?.logo?.message?.logo ? (
        <Box
          w="80px"
          height="80px"
          display="flex"
          borderRadius="full"
          alignItems="center"
          justifyContent="center"
          backgroundColor="rgb(222,222,222)"
          overflow="hidden"
          p={4}
          key={`${props.companyName}--${props.currCompany}--box`}
        >
          <UserPermissionsRestricted to="view">
            <Img
              backgroundColor="rgb(222, 222, 0)"
              backgroundImage={"twali-assets/bannerimage.png"}
              bgSize={"contain"}
              style={{ cursor: "pointer" }}
              key={`${props.companyName}--${props.currCompany}`}
              alignSelf="center"
              src={props.company.logo.message.logo}
              alt={props.companyName}
              onClick={() => {
                props.setCurrCompany(props.currCompany);
                props.onCompanyModalOpen();
              }}
            />
          </UserPermissionsRestricted>
          <UserPermissionsRestricted to="edit">
            <Img
              backgroundColor="rgb(222, 222, 222)"
              style={{ cursor: "pointer" }}
              key={`${props.companyName}--${props.currCompany}`}
              alignSelf="center"
              src={props.company.logo.message.logo}
              alt={props.companyName}
              onMouseEnter={(e) => (e.currentTarget.src = "edit.svg")}
              onMouseLeave={(e) =>
                (e.currentTarget.src = props.company.logo.message.logo)
              }
              onClick={() => {
                props.setCurrCompany(props.currCompany);
                props.onCompanyModalOpen();
              }}
            />
          </UserPermissionsRestricted>
        </Box>
      ) : props ? (
        <Box
          w="80px"
          height="80px"
          borderRadius="full"
          backgroundColor="rgb(222, 222, 222)"
          bgGradient={
            "linear-gradient(136.3deg, #0DD5D1 -3.88%, #9350B3 84.78%)"
          }
          overflow="hidden"
          p={4}
          key={`${props.companyName}--${props.currCompany}--box`}
          onMouseEnter={(e) => {
            let addImg = e.currentTarget.children[0] as HTMLElement;
            let compLogo = e.currentTarget.children[1] as HTMLElement;
            addImg.style.display = "flex";
            compLogo.style.display = "none";
          }}
          onMouseLeave={(e) => {
            let addImg = e.currentTarget.children[0] as HTMLElement;
            let compLogo = e.currentTarget.children[1] as HTMLElement;
            addImg.style.display = "none";
            compLogo.style.display = "flex";
          }}
          onClick={() => {
            props.setCurrCompany(props.currCompany);
            props.onCompanyModalOpen();
          }}
        >
          <Img
            backgroundColor="rgb(222, 222, 222)"
            bgGradient={
              "linear-gradient(136.3deg, #0DD5D1 -3.88%, #9350B3 84.78%)"
            }
            borderRadius="full"
            style={{ cursor: "pointer" }}
            key={`${props.companyName}--${props.currCompany}`}
            alignSelf="center"
            src="edit.svg"
            alt="edit stock img"
            display={"none"}
          />
          <Text
            w={"full"}
            h={"full"}
            fontSize="4xl"
            fontWeight="400"
            display={"flex"}
            color={"#F9FFF2"}
            justifyContent={"center"}
            alignItems={"center"}
            fontFamily={"GrandSlang"}
          >
            {props.companyName[0].toUpperCase()}
          </Text>
        </Box>
      ) : (
        <>
          <Img
            key={`${props.currCompany}--empty-company-exp`}
            borderRadius="full"
            style={{ cursor: "pointer" }}
            backgroundColor="transparent"
            width="80px"
            src="twali-assets/plusicon.png"
            alt="add img"
            onClick={() => {
              props.setCurrCompany(props.currCompany);
              props.onCompanyModalOpen();
            }}
          />
        </>
      )}
    </>
  );
};
