import { Person } from '../../db/entitys/person';
export const PersonProvider = {
    provide: 'PersonRepository',
    useValue: Person,
};
