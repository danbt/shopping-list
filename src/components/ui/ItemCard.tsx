import React, { FC } from "react";
import { Box, IconButton, Checkbox, Heading, VStack, Text, Spacer, HStack } from "@chakra-ui/react";
import QuantityEdit from "./QuantityEdit";
import { CloseIcon } from "@chakra-ui/icons";
import { IItemCard, itemType } from "../types/listItem";
import { databaseRef } from "../../services/firebase";

const ItemCard: FC<IItemCard> = ({ item, deleteItem, currentListId }) => {
  const returnColor = (itemType: itemType): string => {
    switch (itemType) {
      case "Fresh":
        return "brandGreen.100";
      case "Frozen":
        return "brandBlue.100";
      case "Cupboard":
        return "brandYellow.100";
      case "Other":
        return "brandRed.100";
      default:
        return "grey.200";
    }
  };

  const updateQuantity = (newQuantity: number) => {
    databaseRef.child(`lists/${currentListId}/items/${item.id}`).set({ ...item, quantityRequired: newQuantity });
  };

  const updateItemIsChecked = (newState: boolean) => {
    databaseRef.child(`lists/${currentListId}/items/${item.id}`).set({ ...item, itemIsChecked: newState });
  };

  return (
    <Box position="relative">
      <HStack
        bg={item.itemIsChecked ? "gray.300" : "white"}
        p={2}
        rounded="md"
        boxShadow="xl"
        minW="350px"
        align="center"
        justifyContent="left"
      >
        <Checkbox
          mx="2"
          defaultChecked={item.itemIsChecked}
          isChecked={item.itemIsChecked}
          colorScheme="brandOrange"
          onChange={(e) => updateItemIsChecked(e.target.checked)}
        />
        <Box
          width="1"
          height="100%"
          bg={returnColor(item.itemType)}
          rounded="sm"
          color={returnColor(item.itemType)}
          marginRight="2"
        >
          ,
        </Box>

        <VStack justifyContent="flex-start" textAlign="left" align="left" minWidth="75px">
          <Heading
            isTruncated
            color="brandBlue.500"
            fontSize="md"
            textDecoration={item.itemIsChecked ? "line-through" : "none"}
            maxWidth="150px"
          >
            {item.itemName}
          </Heading>
          <Text as="i" fontSize="xs" color="gray.400">
            {item.itemType}
          </Text>
        </VStack>
        <Spacer />
        <Box mr="3">
          <QuantityEdit count={item.quantityRequired} onChange={(newQuantity) => updateQuantity(newQuantity)} />
        </Box>
      </HStack>
      <IconButton
        size="xs"
        color="red.500"
        bg="red.100"
        aria-label="Delete item"
        icon={<CloseIcon />}
        isRound
        onClick={() => deleteItem()}
        position="absolute"
        top="-2.85"
        right="-2.85"
      />
    </Box>
  );

  // return (
  //   <Flex
  //     bg={item.itemIsChecked ? "green.100" : "white"}
  //     p={4}
  //     rounded="md"
  //     boxShadow="xl"
  //     color="black"
  //     maxW="350px"
  //     justify="center"
  //     align="center"
  //   >
  //     <Box p="2">
  //       <IconButton size="lg" aria-label="Item type icon" icon={returnIcon(item.itemType)} isRound />
  //     </Box>
  //     <Box p="2">
  //       <Checkbox
  //         defaultChecked={item.itemIsChecked}
  //         isChecked={item.itemIsChecked}
  //         colorScheme="gray"
  //         onChange={(e) => updateItemIsChecked(e.target.checked)}
  //       >
  //         <Heading size="md">{item.itemName}</Heading>
  //       </Checkbox>
  //     </Box>
  //     <Box p="2">
  //       <QuantityEdit count={item.quantityRequired} onChange={(newQuantity) => updateQuantity(newQuantity)} />
  //     </Box>
  //     <Box p="2">
  //       <IconButton
  //         size="sm"
  //         color="red.500"
  //         bg="red.100"
  //         aria-label="Delete item"
  //         icon={<CloseIcon />}
  //         isRound
  //         onClick={() => deleteItem()}
  //       />
  //     </Box>
  //   </Flex>
  // );
};

export default ItemCard;
