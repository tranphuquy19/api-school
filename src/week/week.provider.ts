import { Week } from '../../db/entitys/week';
export const WeekProvider = {
    provide: 'WeekRepository',
    useValue: Week,
};
