import React, { FC } from "react";
import { Box, IconButton, Checkbox, Heading, Flex } from "@chakra-ui/react";
import { FaAppleAlt, FaBible, FaBoxOpen, FaSnowflake } from "react-icons/fa";
import QuantityEdit from "./QuantityEdit";
import listItem, { itemType } from "../types/listItem";
import { CloseIcon } from "@chakra-ui/icons";

const ItemCard: FC<listItem & { deleteItem: () => void }> = ({
  itemName,
  itemType,
  itemIsChecked,
  quantityRequired = 0,
  deleteItem,
}) => {
  const returnIcon = (itemType: itemType): JSX.Element => {
    switch (itemType) {
      case "Fresh":
        return <FaAppleAlt />;
      case "Frozen":
        return <FaSnowflake />;
      case "Cupboard":
        return <FaBoxOpen />;
      case "Other":
        return <FaBible />;
      default:
        return <FaAppleAlt />;
    }
  };

  return (
    <Box bg="white" p={4} rounded="md" boxShadow="xl" color="black">
      <Flex align="center" justify="center">
        <Box p="2">
          <IconButton size="lg" aria-label="Item type icon" icon={returnIcon(itemType)} isRound />
        </Box>
        <Box p="2">
          <Checkbox checked={itemIsChecked} colorScheme="gray">
            <Heading size="md">{itemName}</Heading>
          </Checkbox>
        </Box>
        <Box p="2">
          <QuantityEdit count={quantityRequired} />
        </Box>
        <Box p="2">
          <IconButton
            size="sm"
            color="red.500"
            bg="red.100"
            aria-label="Delete item"
            icon={<CloseIcon />}
            isRound
            onClick={() => deleteItem()}
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default ItemCard;
