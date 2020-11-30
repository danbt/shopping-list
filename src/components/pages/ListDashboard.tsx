import React, { FC, useEffect, useState } from "react";
import { Center, VStack, Container } from "@chakra-ui/react";
import ItemCard from "../ui/ItemCard";
import CreateNewItem from "../ui/CreateNewItem";
import listItem from "../types/listItem";
import { databaseRef, listsRef } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import IList from "../types/list";
import SelectList from "../ui/SelectList";
import CreateNewList from "../ui/CreateNewList";

const ListDashboard: FC = () => {
  const [listItems, setListItems] = useState<listItem[]>([]);
  const [currentList, setCurrentList] = useState("");
  const [userLists, setUserLists] = useState<Partial<IList>[]>([]);
  const fbAuth = useAuth();

  const removeItemFromList = async (id: string) => {
    try {
      await databaseRef.child(`lists/${currentList}/items/${id}`).remove();
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
      setCurrentList(list.key ?? "unset");
    } catch (e) {
      throw new Error(e);
    }
  };

  useEffect(() => {
    const getActiveListItems = () => {
      try {
        databaseRef.child(`lists/${currentList}/items`).on("value", (snapshot) => {
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
      databaseRef.child(`lists/${currentList}/items`).off();
    };
  }, [currentList, fbAuth?.loggedInUser.uid]);

  return (
    <Container width="1200px" alignContent="center" justifyContent="center">
      <Center bg="gray.300" color="white" rounded="lg">
        <VStack spacing={4}>
          <CreateNewList createNewList={(newName) => createNewList(newName)} />
          <SelectList lists={userLists} updateSelection={(selectedList) => setCurrentList(selectedList)} />
          <CreateNewItem
            addItemToList={(newItem) => {
              setListItems([...listItems, newItem]);
              databaseRef.child(`lists/${currentList}/items`).push(newItem);
            }}
          />

          {listItems.map((item, index) => {
            return (
              <ItemCard
                key={`${index}.${item.itemName}`}
                item={item}
                deleteItem={() => removeItemFromList(item.id)}
                currentListId={currentList}
              />
            );
          })}
        </VStack>
      </Center>
    </Container>
  );
};

export default ListDashboard;
