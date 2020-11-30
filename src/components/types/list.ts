import listItem from "./listItem";
import User from "./user";

export default interface IList {
    id:string;
    createdBy: string;
    name: string;
    users: User[];
    items: listItem[];
}
