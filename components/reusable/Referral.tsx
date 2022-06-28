import { Button, useClipboard, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";

interface ReferralProps {
  userWallet: string;
  contractID?: string;
  children: React.ReactNode;
}
export function Referral({ userWallet, contractID, children }: ReferralProps) {
  const URL = contractID
    ? `login?referred_by=${userWallet}?contract_id=${contractID}`
    : `login?referred_by=${userWallet}`;
  function handleCopy() {
    onCopy();
  }
  const toast = useToast();
  const { hasCopied, onCopy } = useClipboard(`https://www.twali.xyz/` + URL);
  useEffect(() => {
    if (!hasCopied) return;
    toast({
      title: "Referral link copied to clipboard",
      status: "success",
      variant: "subtle",
      position: "top",
      duration: 5000,
      isClosable: true,
    });

    return () => {};
  }, [hasCopied]);

  return (
    <Button
      display={"flex"}
      onClick={() => {
        handleCopy();
      }}
      variant={"unstyled"}
      width={"100%"}
    >
      {children}
    </Button>
  );
}
