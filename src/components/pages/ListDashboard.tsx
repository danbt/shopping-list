import React, { FC, useEffect, useState } from "react";
import { VStack, Box, Container, Flex, Center } from "@chakra-ui/react";
import ItemCard from "../ui/ItemCard";
import CreateNewItem from "../ui/CreateNewItem";
import listItem from "../types/listItem";
import { databaseRef, listsRef } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import IList from "../types/list";
import SelectList from "../ui/SelectList";
import CreateNewList from "../ui/CreateNewList";
import { useAppState } from "../../contexts/AppStateContext";

const ListDashboard: FC = () => {
  const [listItems, setListItems] = useState<listItem[]>([]);
  const [userLists, setUserLists] = useState<Partial<IList>[]>([]);
  const fbAuth = useAuth();
  const appState = useAppState();

  const removeItemFromList = async (id: string) => {
    try {
      await databaseRef.child(`lists/${appState?.getSelectedList()}/items/${id}`).remove();
    } catch (e) {
      throw new Error(e);
    }
  };

  const createNewList = async (newName: string) => {
    try {
      const list = listsRef.push({
        name: newName,
        items: [],
        createdBy: fbAuth?.loggedInUser.uid,
        users: [fbAuth?.loggedInUser.uid],
      });
      appState?.setSelectedList(list.key ?? "unset");
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    const getActiveListItems = () => {
      try {
        databaseRef.child(`lists/${appState?.getSelectedList()}/items`).on("value", (snapshot) => {
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
      } catch (e) {
        throw new Error(e);
      }
    };

    const getUserLists = () => {
      try {
        listsRef.on("value", (snapshot) => {
          let lists: IList[] = snapshot.val();
          let newLists: Partial<IList>[] = [];
          for (let list in lists) {
            if (lists[list].createdBy === fbAuth?.loggedInUser.uid) {
              newLists.push({
                id: list,
                name: lists[list].name,
              });
            }
          }
          setUserLists(newLists);
        });
      } catch (e) {
        throw new Error(e);
      }
    };

    getActiveListItems();
    getUserLists();

    return () => {
      listsRef.off();
      databaseRef.child(`lists/${appState?.getSelectedList()}/items`).off();
    };
  }, [appState, fbAuth?.loggedInUser.uid]);

  return (
    <Center>
      <Container maxW="3xl" mx="0" px="0">
        <Box height="90vh" position="relative">
          <Box p="1" bg="white" marginBottom="0" roundedBottom="xl" boxShadow="md" zIndex="1000" position="relative">
            <CreateNewList createNewList={(newName) => createNewList(newName)} />
            <SelectList lists={userLists} />
          </Box>
          <Flex
            bg="gray.100"
            direction="column"
            height="100%"
            position="absolute"
            top="100"
            left="0"
            zIndex="500"
            width="100%"
          >
            <VStack justifyContent="center">
              <CreateNewItem
                addItemToList={(newItem) => {
                  setListItems([...listItems, newItem]);
                  if (appState?.getSelectedList()) {
                    databaseRef.child(`lists/${appState?.getSelectedList()}/items`).push(newItem);
                  }
                }}
              />
              {listItems.map((item, index) => {
                return (
                  <ItemCard
                    key={`${index}.${item.itemName}`}
                    item={item}
                    deleteItem={() => removeItemFromList(item.id)}
                    currentListId={appState?.getSelectedList() ?? ""}
                  />
                );
              })}
            </VStack>
          </Flex>
        </Box>
      </Container>
    </Center>
  );
};

export default ListDashboard;
