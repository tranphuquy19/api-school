import { School } from '../../db/entitys/school';
export const SchoolProvider = {
    provide: 'SchoolRepository',
    useValue: School,
};
