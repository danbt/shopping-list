import React, { FC, useEffect, useState } from "react";
import { Center, VStack, Container } from "@chakra-ui/react";
import ItemCard from "../ui/ItemCard";
import CreateNewItem from "../ui/CreateNewItem";
import listItem from "../types/listItem";
import { itemsRef } from "../../services/firebase";

const LandingLayout: FC = () => {
  const [listItems, setListItems] = useState<listItem[]>([]);

  const removeItemFromList = (id: string) => {
    itemsRef.child(id).remove();
  };

  useEffect(() => {
    itemsRef.on("value", (snapshot) => {
      let items: listItem[] = snapshot.val();
      let newState: listItem[] = [];
      for (let item in items) {
        newState.push({
          id: item,
          itemName: items[item].itemName,
          itemType: items[item].itemType,
          itemIsChecked: items[item].itemIsChecked,
          quantityRequired: items[item].quantityRequired,
        });
      }
      setListItems(newState);
    });
  }, []);

  return (
    <Container width="1200px" alignContent="center" justifyContent="center">
      <Center bg="gray.300" color="white" rounded="lg">
        <VStack width="100%" spacing={4}>
          <CreateNewItem
            addItemToList={(newItem) => {
              console.log("item", newItem);
              setListItems([...listItems, newItem]);
              itemsRef.push(newItem);
            }}
          />
          {listItems.map((item, index) => {
            return (
              <ItemCard key={`${index}.${item.itemName}`} item={item} deleteItem={() => removeItemFromList(item.id)} />
            );
          })}
        </VStack>
      </Center>
    </Container>
  );
};

export default LandingLayout;
