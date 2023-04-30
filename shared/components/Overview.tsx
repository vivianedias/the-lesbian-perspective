import { Box, Flex } from "@chakra-ui/react";
import styled from "@emotion/styled";
import Image from "next/image";

function groupPhotos(photos: string[]) {
  const chunkSize = 2;
  const group = [];

  for (let i = 0; i < photos.length; i += chunkSize) {
    const chunk = photos.slice(i, i + chunkSize);
    group.push(chunk);
  }

  return group;
}

const Img = styled(Image)`
  object-fit: contain;
  width: 100% !important;
  position: relative !important;
  height: unset !important;
  vertical-align: middle;
  margin-top: 8px;
`;

const Column = styled(Box)`
  & > div {
    position: unset !important;
  }
`;

export default function Overview({ photoUrls }: { photoUrls: string[] }) {
  const photoGroups = groupPhotos(photoUrls);

  return (
    <>
      <Flex flexWrap={"wrap"} px={1}>
        {photoGroups.map((photoGroup) => {
          return (
            <Column
              key={photoGroup[0]}
              flex={{ base: "100%", md: "50%" }}
              maxW={{ base: "100%", md: "50%" }}
              px={1}
              w={"full"}
            >
              {photoGroup.map((src) => (
                <Img src={src} alt={""} key={src} fill />
              ))}
            </Column>
          );
        })}
      </Flex>
    </>
  );
}
