import { AlumnList } from "../../db/entitys/alumn-list";

export const AlumnListProvider = {
    provide: 'AlumnListRepository',
    useValue: AlumnList,
};
