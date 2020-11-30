import React, { FC } from "react";
import { Box, Select } from "@chakra-ui/react";
import IList from "../types/list";
const SelectList: FC<{ lists: Partial<IList>[]; updateSelection: (target: string) => void }> = ({
  lists,
  updateSelection,
}) => {
  return (
    <Box p={1}>
      <Select placeholder="Select an available list" onChange={(e) => updateSelection(e.target.value)}>
        {lists.map((list, index) => {
          return (
            <option key={`${list.id}.${index}`} value={list.id}>
              {list.name}
            </option>
          );
        })}
      </Select>
    </Box>
  );
};

export default SelectList;
