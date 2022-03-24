import { Box, Text, HStack, Img } from "@chakra-ui/react";
import React from "react";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import SnapshotModal from "./SnapshotModal/SnapshotModal";
export function ProfileSnapshots({
  snapshotData,
  setCurrentSnapshot,
  onSnapshotModalOpen,
  isSnapshotModalOpen,
  onSnapshotModalClose,
  currentSnapshot,
}) {
  return (
    <Box
      alignSelf="flex-start"
      w="full"
      overflow="hidden"
      mb={"40px !important"}
    >
      <UserPermissionsRestricted to="view">
        <Text
          fontSize="32px"
          lineHeight={"48px"}
          letterSpacing={"wide"}
          fontFamily={"GrandSlang"}
          mb={4}
        >
          Badges
        </Text>
      </UserPermissionsRestricted>
      <UserPermissionsRestricted to="edit">
        <Text
          fontSize="32px"
          lineHeight={"48px"}
          letterSpacing={"wide"}
          fontFamily={"GrandSlang"}
          mb={!snapshotData?.length ? "unset" : 4}
        >
          Badges
        </Text>
        {!snapshotData?.length && (
          <Text
            fontSize="16px"
            color={"#98B2B2"}
            mt={4}
            mb={8}
            lineHeight={"24px"}
            letterSpacing={"wide"}
            fontFamily={"PP Telegraf Light"}
          >
            The badges you earn participating in web3 will appear below
          </Text>
        )}
      </UserPermissionsRestricted>
      {snapshotData ? (
        <>
          <HStack spacing={4}>
            {!!snapshotData?.length ? (
              snapshotData?.map((vote) => (
                <Img
                  style={{
                    cursor: "pointer",
                  }}
                  key={vote.spaceID}
                  borderRadius="full"
                  width="80px"
                  src={vote.avatar}
                  alt={`snapshot${vote.spaceID}`}
                  onClick={() => {
                    setCurrentSnapshot(vote);
                    onSnapshotModalOpen();
                  }}
                />
              ))
            ) : (
              <Img
                borderRadius="full"
                style={{ cursor: "pointer" }}
                backgroundColor="transparent"
                width="80px"
                src="twali-assets/questionmark.png"
                alt="add img"
              />
            )}
          </HStack>
          <SnapshotModal
            isOpen={isSnapshotModalOpen}
            onClose={onSnapshotModalClose}
            snapshotData={currentSnapshot}
          />
        </>
      ) : null}
    </Box>
  );
}
