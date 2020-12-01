import React, { FC } from "react";
import { Box, Select } from "@chakra-ui/react";
import IList from "../types/list";
import { useAppState } from "../../contexts/AppStateContext";
const SelectList: FC<{ lists: Partial<IList>[] }> = ({ lists }) => {
  const appState = useAppState();

  console.log(appState?.getSelectedList());

  return (
    <Box p={1}>
      <Select
        variant="outline"
        placeholder="current list..."
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
    </Box>
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
