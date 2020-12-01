import React, { FC } from "react";
import { Box, IconButton, Checkbox, Heading, Flex } from "@chakra-ui/react";
import { FaAppleAlt, FaBible, FaBoxOpen, FaSnowflake } from "react-icons/fa";
import QuantityEdit from "./QuantityEdit";
import { CloseIcon } from "@chakra-ui/icons";
import { IItemCard, itemType } from "../types/listItem";
import { databaseRef } from "../../services/firebase";

const ItemCard: FC<IItemCard> = ({ item, deleteItem, currentListId }) => {
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

  const updateQuantity = (newQuantity: number) => {
    databaseRef.child(`lists/${currentListId}/items/${item.id}`).set({ ...item, quantityRequired: newQuantity });
  };

  const updateItemIsChecked = (newState: boolean) => {
    databaseRef.child(`lists/${currentListId}/items/${item.id}`).set({ ...item, itemIsChecked: newState });
  };

  return (
    <Flex
      bg={item.itemIsChecked ? "green.100" : "white"}
      p={4}
      rounded="md"
      boxShadow="xl"
      color="black"
      maxW="350px"
      justify="center"
      align="center"
    >
      <Box p="2">
        <IconButton size="lg" aria-label="Item type icon" icon={returnIcon(item.itemType)} isRound />
      </Box>
      <Box p="2">
        <Checkbox
          defaultChecked={item.itemIsChecked}
          isChecked={item.itemIsChecked}
          colorScheme="gray"
          onChange={(e) => updateItemIsChecked(e.target.checked)}
        >
          <Heading size="md">{item.itemName}</Heading>
        </Checkbox>
      </Box>
      <Box p="2">
        <QuantityEdit count={item.quantityRequired} onChange={(newQuantity) => updateQuantity(newQuantity)} />
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
  );
};

export default ItemCard;
