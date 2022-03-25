import { Box, Text, HStack, Img, Tooltip } from "@chakra-ui/react";
import React from "react";
import UserPermissionsRestricted from "../UserPermissionsProvider/UserPermissionsRestricted";
import BadgesModal from "./BadgesModal/BadgesModal";
export function ProfileBadges({
  poapsData,
  snapshotData,
  setCurrentBadge,
  onBadgesModalOpen,
  isBadgesModalOpen,
  onBadgesModalClose,
  currentBadge,
}) {

  let badges = [];

  if (poapsData && poapsData.length > 0) {
    poapsData.forEach(poap => {
      poap.type = 'poap';
      badges.push(poap);
    })
  }

  if (snapshotData && snapshotData.length > 0) {
    snapshotData.forEach(vote => {
      vote.type = 'snapshot';
      badges.push(vote);
    })
  }
  
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
          mb={!badges?.length ? "unset" : 4}
        >
          Badges
        </Text>
        {!badges?.length && (
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
      {badges ? (
        <>
          <HStack spacing={4} maxW={"640px"} display={"flex"} flexWrap={"wrap"} justifyContent={[badges?.length < 6 ? "unset" : "space-between"]}>
            {!!badges?.length ? (
              <>
              {badges?.map((badge, idx) => (
                
                <>
                {badge.type == 'snapshot' ? (
                  <Img
                  marginLeft={[
                    "0 !important",
                    idx === 0 || idx >= 6 ? "0px" : "32px !important",
                  ]}
                  marginBottom={[
                    "0 !important",
                    idx >= 6 ? "0px" : "32px !important",
                  ]}
                  style={{
                    cursor: "pointer",
                  }}
                  key={badge.spaceID}
                  borderRadius="full"
                  width="80px"
                  src={badge.avatar}
                  alt={`snapshot${badge.spaceID}`}
                  onClick={() => {
                    setCurrentBadge(badge);
                    onBadgesModalOpen();
                  }}
                />
                ) : (badge.type == 'poap' ? (
                  <Img
                  marginLeft={[
                    "0 !important",
                    idx === 0 || idx >= 6 ? "0px" : "32px !important",
                  ]}
                  marginBottom={[
                    "0 !important",
                    idx >= 6 ? "0px" : "32px !important",
                  ]}
                  style={{
                    cursor: "pointer",
                  }}
                  key={badge.tokenId}
                  borderRadius="full"
                  width="80px"
                  src={badge.event.image_url}
                  alt={`poap${badge.tokenId}`}
                  onClick={() => {
                    setCurrentBadge(badge);
                    onBadgesModalOpen();
                  }}
                />
                ): null)}
                </>
              ))}
              </>
              )
             : (
              <>
                <UserPermissionsRestricted to="view">
                  <Tooltip
                    margin={0}
                    backgroundColor={"#F9FFF2"}
                    color={"#0A1313"}
                    label={
                      "Badges earned participating in web3 will appear here"
                    }
                  >
                    <Img
                      borderRadius="full"
                      style={{ cursor: "pointer" }}
                      backgroundColor="transparent"
                      width="80px"
                      src="twali-assets/questionmark.png"
                      alt="add img"
                    />
                  </Tooltip>
                </UserPermissionsRestricted>
                <UserPermissionsRestricted to="edit">
                  <Img
                    borderRadius="full"
                    style={{ cursor: "pointer" }}
                    backgroundColor="transparent"
                    width="80px"
                    src="twali-assets/questionmark.png"
                    alt="add img"
                  />
                </UserPermissionsRestricted>
              </>
            )}
          </HStack>
          <BadgesModal
            badge={currentBadge}
            isOpen={isBadgesModalOpen}
            onClose={onBadgesModalClose}
          />
        </>
      ) : null}
    </Box>
  );
}
