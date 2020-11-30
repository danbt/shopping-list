import React, { FC, useEffect, useRef, useState } from "react";
import { Center, VStack, Container, Button, Input, Select } from "@chakra-ui/react";
import ItemCard from "../ui/ItemCard";
import CreateNewItem from "../ui/CreateNewItem";
import listItem from "../types/listItem";
import { databaseRef, itemsRef, listsRef } from "../../services/firebase";
import { useAuth } from "../../contexts/AuthContext";
import IList from "../types/list";

const ListDashboard: FC = () => {
  const [listItems, setListItems] = useState<listItem[]>([]);
  const [currentList, setCurrentList] = useState("");
  const [userLists, setUserLists] = useState<Partial<IList>[]>([]);
  const [errorTest, setErrorText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const listNameRef = useRef<HTMLInputElement>(null);
  const fbAuth = useAuth();

  const removeItemFromList = (id: string) => {
    itemsRef.child(id).remove();
  };

  const createNewList = () => {
    const list = listsRef.push({
      name: listNameRef.current?.value,
      items: [],
      createdBy: fbAuth?.loggedInUser.uid,
      users: [fbAuth?.loggedInUser.uid],
    });
    setCurrentList(list.key ?? "unset");
  };

  useEffect(() => {
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
  }, [currentList, fbAuth?.loggedInUser.uid]);

  return (
    <Container width="1200px" alignContent="center" justifyContent="center">
      <Center bg="gray.300" color="white" rounded="lg">
        <Input name="listName" ref={listNameRef} placeholder="enter list name here.." />
        <Button onClick={() => createNewList()}>Create new list</Button>
        <VStack width="100%" spacing={4}>
          <Select placeholder="Select an available list" onChange={(e) => setCurrentList(e.target.value)}>
            {userLists.map((list) => {
              return <option value={list.id}>{list.id}</option>;
            })}
          </Select>
          <CreateNewItem
            addItemToList={(newItem) => {
              console.log("item", newItem);
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
