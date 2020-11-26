import React, { FC, useState } from "react";
import { Center, VStack, Container } from "@chakra-ui/react";
import ItemCard from "../ui/ItemCard";
import CreateNewItem from "../ui/CreateNewItem";
import listItem from "../types/listItem";

const LandingLayout: FC = () => {
  const [listItems, setListItems] = useState<listItem[]>([]);

  const removeItemFromList = (index: number) => {
    setListItems(listItems.filter((item, count) => count !== index));
  };

  return (
    <Container width="1200px" alignContent="center" justifyContent="center">
      <Center bg="gray.300" color="white" rounded="lg">
        <VStack width="100%" spacing={4}>
          <CreateNewItem
            addItemToList={(newItem) => {
              console.log(newItem);
              setListItems([...listItems, newItem]);
            }}
          />
          {listItems.map((item, index) => {
            return (
              <ItemCard
                key={`${index}.${item.itemName}`}
                itemName={item.itemName}
                itemType={item.itemType}
                itemIsChecked={item.itemIsChecked}
                quantityRequired={item.quantityRequired}
                deleteItem={() => removeItemFromList(index)}
              />
            );
          })}
        </VStack>
      </Center>
    </Container>
  );
};

export default LandingLayout;
