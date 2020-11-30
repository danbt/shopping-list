export default interface listItem {
    id:string,
    itemName: string;
    itemType: itemType;
    quantityRequired: number;
    itemIsChecked: boolean;
    
  }

  export interface IItemCard {
    item: listItem,
    deleteItem:()=>void,
    currentListId:string;
  }

  export type itemType = "Fresh" | "Frozen" | "Cupboard" | "Other";