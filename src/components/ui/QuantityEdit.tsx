import React, { FC } from "react";
import { Box, IconButton, Flex, Heading } from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const QuantityEdit: FC<{ count: number; onChange: (newQuantity: number) => void }> = ({ count, onChange }) => {
  return (
    <Box p={1}>
      <Flex align="center" justify="center">
        <IconButton
          variant="outline"
          m="1"
          aria-label="Reduce quantity"
          icon={<ChevronLeftIcon />}
          isRound
          size="sm"
          onClick={() => onChange(count - 1)}
        />
        <Heading m="1" fontSize="md">
          {count}
        </Heading>
        <IconButton
          variant="outline"
          m="1"
          aria-label="Increase quantity"
          icon={<ChevronRightIcon />}
          isRound
          size="sm"
          onClick={() => onChange(count + 1)}
        />
      </Flex>
    </Box>
  );
};

export default QuantityEdit;
