import React, { FC } from "react";
import { Box, Input, Flex, Button, Select, Text, HStack } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import listItem, { itemType } from "../types/listItem";

type Inputs = {
  itemName: string;
  itemType: itemType;
};

const CreateNewItem: FC<{ addItemToList: (data: listItem) => void }> = ({ addItemToList }) => {
  const { register, handleSubmit, errors, reset } = useForm<Inputs>();
  const onSubmit = (data: listItem) => {
    data.itemIsChecked = false;
    data.quantityRequired = 1;
    addItemToList(data);
    reset();
  };

  // return (
  //   <Flex rounded="md" bg="white" marginTop="4" position="relative" boxShadow="lg" minWidth="95%">
  //     <HStack spacing="1" align="center" justify="center">
  //       <Box bg="red.200" roundedLeft="md" zIndex="500">
  //         <Text fontSize="lg">-</Text>
  //       </Box>
  //       <Box bg="white" zIndex="1000">
  //         <Text fontSize="lg">Content</Text>
  //       </Box>
  //       <Box bg="green.200" roundedRight="md" zIndex="500">
  //         <Text fontSize="lg">+</Text>
  //       </Box>
  //     </HStack>
  //   </Flex>
  // );

  return (
    <Box m="0" p={4}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <HStack>
          <Flex align="center" justify="center" flexDirection="column">
            <Box m="1">
              <Input
                variant="outline"
                colorScheme="brandGreen"
                name="itemName"
                placeholder="Enter new item here..."
                ref={register({ required: true })}
              />
              {errors.itemName && <span>This field is required</span>}
            </Box>
            <Box m="1" width="100%">
              <Select
                colorScheme="brandGreen"
                name="itemType"
                ref={register({ required: true })}
                placeholder="Select type"
                p="1"
              >
                <option value="Fresh">Fresh</option>
                <option value="Frozen">Frozen</option>
                <option value="Cupboard">Cupboard</option>
                <option value="Other">Other</option>
              </Select>
              {errors.itemType && <span>This field is required</span>}
            </Box>
          </Flex>
          <Box p="2">
            <Button type="submit" leftIcon={<AddIcon />} colorScheme="brandGreen" variant="solid">
              Add
            </Button>
          </Box>
        </HStack>
      </form>
    </Box>
  );
};

export default CreateNewItem;
