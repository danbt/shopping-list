import React, { FC } from "react";
import { Box, Flex, Heading } from "@chakra-ui/react";

const Template: FC<{ title: string }> = (props) => {
  return (
    <Box height="90vh" position="relative">
      <Box p="1" bg="white" marginBottom="10" roundedBottom="xl" boxShadow="md" zIndex="1000" position="relative">
        <Heading fontSize="2xl" textAlign="center">
          {props.title}
        </Heading>
      </Box>
      <Flex
        bg="gray.100"
        direction="column"
        height="100%"
        position="absolute"
        top="5"
        left="0"
        zIndex="500"
        width="100%"
      >
        <Box marginTop="10">{props.children}</Box>
      </Flex>
    </Box>
  );
};
export default Template;
