import { Grade } from '../../db/entitys/grade';
export const GradeProvider = {
    provide: 'GradeRepository',
    useValue: Grade,
};
