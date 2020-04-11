import { Tab } from '../../db/entitys/tab';
export const TabProvider = {
    provide: 'TabRepository',
    useValue: Tab,
};
