import { Course } from '../../db/entitys/course';
export const CourseProvider = {
    provide: 'CourseRepository',
    useValue: Course,
};
