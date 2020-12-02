import React, { FC } from "react";
import {
  Button,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
} from "@chakra-ui/react";
import IList from "../types/list";
import { useAppState } from "../../contexts/AppStateContext";
import { databaseRef } from "../../services/firebase";
import { DeleteIcon } from "@chakra-ui/icons";
const SelectList: FC<{ lists: Partial<IList>[] }> = ({ lists }) => {
  const appState = useAppState();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const deleteCurrentList = async () => {
    try {
      await databaseRef.child(`lists/${appState?.getSelectedList()}`).remove();
      appState?.setSelectedList("");
      onClose();
    } catch (e) {
      throw new Error(e);
    }
  };

  return (
    <>
      <HStack spacing="2" p="1">
        <Select
          variant="outline"
          placeholder="select a list..."
          onChange={(e) => appState?.setSelectedList(e.target.value)}
        >
          {lists.map((list, index) => {
            return (
              <option key={`${list.id}.${index}`} value={list.id}>
                {list.name}
              </option>
            );
          })}
        </Select>

        <IconButton color="red.500" bg="red.100" aria-label="Delete list" icon={<DeleteIcon />} onClick={onOpen} />
      </HStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete List</ModalHeader>
          <ModalCloseButton />
          <ModalBody>Are you sure you want to delete this list?</ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose} variant="outline">
              Cancel
            </Button>
            <Button colorScheme="brandRed" onClick={() => deleteCurrentList()} variant="solid">
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
  // return (
  //   <Box p={1}>
  //     <Select placeholder="Select an available list" onChange={(e) => updateSelection(e.target.value)}>
  //       {lists.map((list, index) => {
  //         return (
  //           <option key={`${list.id}.${index}`} value={list.id}>
  //             {list.name}
  //           </option>
  //         );
  //       })}
  //     </Select>
  //   </Box>
  // );
};

export default SelectList;
