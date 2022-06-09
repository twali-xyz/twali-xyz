
import { useState, useEffect } from "react";
import { Container } from "@chakra-ui/react";
import SOWBuilderSteps from "../components/SOWBuilderSteps/SOWBuilderSteps";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import useUser from "../context/TwaliContext";
import background from "../public/twali-assets/backgroundscreen.png";
import { useSteps } from "chakra-ui-steps";
import { UserData } from "../utils/interfaces";
import TokenProvider from '../context/TokenContext';
import BountyProvider from "../context/BountyContext";
import UserPermissionsProvider from "../components/UserPermissionsProvider/UserPermissionsProvider";
import UserPermissionsRestricted from "../components/UserPermissionsProvider/UserPermissionsRestricted";
import { fetchPagePermission, pageDisconnectedFallback } from "../utils/walletUtils";

const WerkSteps = () => {
  const { setData, ...userState } = useUser();
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    userData && setData(JSON.parse(JSON.stringify(userData)));
  }, [userData]);

  return (
    <>
    <TokenProvider>
      <BountyProvider>
        <title>twali.xyz - marketplace</title>
        <Container
            width="100%"
            minHeight="100vh"
            maxW={"100%"}
            pos={"relative"}
            bgSize={"cover"}
            bgPosition={"center"}
            bgImg={activeStep === 2 ? 'inverse' : `url(${background.src})`}
            px={0}
            pb={4}
          >
        <UserPermissionsProvider
          fetchPermission={fetchPagePermission(
            userState.userWallet ? userState.userWallet : null
        )}>
        <HeaderNav 
            whichPage={activeStep === 2 ? "profile" : "create-werk"}
            userPage={userState}
            userWallet={userState.userWallet}
            isConnectWalletBtn={!userState.userWallet}
            setUserData={setUserData}
            />

          <UserPermissionsRestricted
                to="edit"
                key={`--SOW-builder-usr-permission`}
                fallback={pageDisconnectedFallback()}
              >
          <SOWBuilderSteps 
          nextStep={nextStep}
          prevStep={prevStep}
          setStep={setStep}
          reset={reset}
          activeStep={activeStep}
          />
          </UserPermissionsRestricted>
          </UserPermissionsProvider>
          </Container>
        </BountyProvider>
      </TokenProvider>
    </>
  );
};

export default WerkSteps;
