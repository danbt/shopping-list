import React, { FC, useEffect, useState } from "react";
import { VStack, Box } from "@chakra-ui/react";
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
    <Box p="2" minWidth="50%" maxWidth="75%" marginX="auto">
      <CreateNewList createNewList={(newName) => createNewList(newName)} />
      <SelectList lists={userLists} />

      <Box bg="gray.50" height="75vh" m="1">
        <CreateNewItem
          addItemToList={(newItem) => {
            setListItems([...listItems, newItem]);
            if (appState?.getSelectedList()) {
              databaseRef.child(`lists/${appState?.getSelectedList()}/items`).push(newItem);
            }
          }}
        />

        <VStack justifyContent="center">
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
      </Box>
    </Box>
  );
};

export default ListDashboard;
