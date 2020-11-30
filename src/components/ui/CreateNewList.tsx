import React, { FC, useRef } from "react";
import { Box, Button, Input } from "@chakra-ui/react";

const CreateNewList: FC<{ createNewList: (newName: string) => void }> = ({ createNewList }) => {
  const listNameRef = useRef<HTMLInputElement>(null);

  return (
    <Box p={1}>
      <Input name="listName" ref={listNameRef} placeholder="enter list name here.." />
      <Button onClick={() => createNewList(listNameRef.current?.value ?? "Unset List Name")}>Create new list</Button>
    </Box>
  );
};

export default CreateNewList;
