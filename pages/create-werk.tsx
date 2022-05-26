
import { Container } from "@chakra-ui/react";
import SOWBuilderSteps from "../components/SOWBuilderSteps/SOWBuilderSteps";
import HeaderNav from "../components/HeaderNav/HeaderNav";
import useUser from "../context/TwaliContext";
import background from "../public/twali-assets/backgroundscreen.png";
import { useSteps } from "chakra-ui-steps";

const WerkSteps = () => {
  const { ...userState } = useUser();
  const { nextStep, prevStep, setStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  return (
    <>
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
    <HeaderNav 
        whichPage={activeStep === 2 ? "profile" : "create-werk"}
        userPage={userState}
        userWallet={userState.userWallet}
        isConnectWalletBtn={!userState.userWallet}
        />
      <SOWBuilderSteps 
      nextStep={nextStep}
      prevStep={prevStep}
      setStep={setStep}
      reset={reset}
      activeStep={activeStep}
       />
      </Container>
    </>
  );
};

export default WerkSteps;
