export default interface listItem {
    itemName: string;
    itemType: itemType;
    quantityRequired: number;
    itemIsChecked: boolean;
  }

  export type itemType = "Fresh" | "Frozen" | "Cupboard" | "Other";