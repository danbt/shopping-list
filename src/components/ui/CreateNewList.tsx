import React, { FC, useRef } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack } from "@chakra-ui/react";

const CreateNewList: FC<{ createNewList: (newName: string) => void }> = ({ createNewList }) => {
  const listNameRef = useRef<HTMLInputElement>(null);

  return (
    <Box p={1}>
      <VStack spacing="4">
        <FormControl id="listName">
          <FormLabel>List name</FormLabel>
          <Input name="listName" ref={listNameRef} placeholder="enter a name..." isRequired />
        </FormControl>

        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => createNewList(listNameRef.current?.value ?? "Unset List Name")}
        >
          Create new list
        </Button>
      </VStack>
    </Box>
  );
};

export default CreateNewList;
