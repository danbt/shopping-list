import React, { FC, useRef } from "react";
import { Button, HStack, Input } from "@chakra-ui/react";

const CreateNewList: FC<{ createNewList: (newName: string) => void }> = ({ createNewList }) => {
  const listNameRef = useRef<HTMLInputElement>(null);

  return (
    <HStack p={1} direction="row" spacing="2" align="flex-end" justify="center">
      <Input variant="outline" name="listName" ref={listNameRef} placeholder="create a new list..." />

      <Button variant="solid" onClick={() => createNewList(listNameRef.current?.value ?? "Unset List Name")}>
        +
      </Button>
    </HStack>
  );
};

export default CreateNewList;
